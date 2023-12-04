//import dotenv
require('dotenv').config();

//import express.js server
const express = require('express');

//Import and require mysql2
const mysql = require('mysql2');

//identify PORT for use in heroku and local host 3001
const PORT = process.env.PORT || 3001;

//use an instance of express server as app
const app = express();

//express middleware to translate and read languages
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Connect to database 
const db = mysql.createConnection(
    {
        host: 'localhost',
        //Mysql username,
        user: process.env.DB_USER,
        //My SQL password 
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log("Connected to the employee database.")
);


//import inquirer
const inquirer = require("inquirer");

//create menu choices array
const menuChoices =
    [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department"
    ];
//object for inquirer prompt
const question = 
    [{
        type: "list",
        message: "What would you like to do?",
        name: "menuChoice",
        choices: menuChoices,
    }];



//create main function
async function main() {
    try {
        //userChoice is response to inquirer prompt
        const userChoice = await inquirer.prompt(question);

        let endPoint;
        switch (userChoice.menuChoice) {
            case "View All Employees":
                endPoint = "employee"
                break;
            case "View All Roles":
                endPoint = "roles"
                break;
            case "View All Departments":
                endPoint = "department"
                break;
        
            default:
                endPoint = "employee";
                break;
        }
        await queryDatabase(endPoint);
    
    } catch (err) {

    }
};

main();

//ROUTES FOR REQUESTS
//query database for get all of a selected endPoint in table format

const queryDatabase = (endPoint) => {
    console.log(endPoint, 'endPoint under function declaration');
    app.get(`/${endPoint}`, (req, res) => {
        
        db.query(`SELECT * FROM roles`), function (err, results) {
            console.log(endPoint, "endPoint at dbquery");
            console.log(results);
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({
                message: "success",
                data: results,
            });

            // Log our request to the terminal
            console.info(`${req.method} request received to get ${endPoint}`);  
        };
    });   
}


// //get all departments
// app.get("/departments", (req, res) => {
//     db.query(`SELECT * FROM department`, function (err, results) {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: "success",
//             data: results,
//         });
//     });
// });
// //get all roles
// app.get("/roles", (req, res) => {
//     const sql = `SELECT * FROM roles`;

//     db.query('SELECT * FROM roles', function (err, results) {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: "success",
//             data: results,
//         });
//     });
// });

// // get all employees
// app.get("/employee", (req, res) => { // ... your code to fetch employees ... }); 

//     db.query(`SELECT * FROM employee`, function (err, results) {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: "success",
//             data: body,
//         });
//     });
// });

    // Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});