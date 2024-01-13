//import express.js server
const express = require('express');

//Import and require mysql2
const mysql = require('mysql2');

//identify PORT for use in heroku and local host 3001
const PORT = process.env.PORT || 3001;

//use an instance of express server as app
const app = express();

// //Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

//Connect to database 

const db = mysql.createConnection(
    {
    host: 'localhost',
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    },
    console.log(`Connected to the employees_db database`)
 );

 const inquirer = require("inquirer");

 async function startApp() {
     try {
         const answer = await inquirer.prompt([
             {
                 type: "list",
                 message: "What would you like to do?",
                 name: "menuChoice",
                 choices: ["View All Employees", "Add Employee"]
             }
         ]);
 
         console.log("User choice:", answer.menuChoice);
 
         // Add your logic based on userChoice here
 
     } catch (err) {
         console.error("Error occurred:", err);
     }
 }
 
 // Call the asynchronous function to start the app
 startApp();

// // import inquirer
//  const inquirer = require("inquirer");

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//     res.status(404).end();
// });

// app.listen(PORT, () => {
// console.log(`Server running on port ${PORT}`);
// });

// const menuChoices = [
//     "View All Employees",
//     "Add Employee",
//     "Update Employee Role",
//     "View All Roles",
//     "Add Role",
//     "View All Departments",
//     "Add Department"
// ];


// //object for inquirer prompt
// // const question = 
// // [{
// //     type: "list",
// //     message: "What would you like to do?",
// //     name: "menuChoice",
// //     choices: menuChoices
// // }],

// const startApp = async() => {
//     try {
//         const answer = await inquirer.prompt([
//             { 
//                 type: "list",
//                 message: "What would you like to do?",
//                 name: "menuChoice",
//                 choices: menuChoices
//             }
//         ]);

//         console.log(answer);
//         let userChoice = answer;
    
//         console.log(userChoice);

//     // let sql;
//     // let query;
//     // let selectSql;
//     // let insertSql;     

//     // switch (userChoice.menuChoice) {            
//     //     case "View All Employees":
//     //         query = "employee";
//     //         sql = selectSql;
//     //         break;
//     //     case "View All Role":
//     //         query = "roles";
//     //         sql = selectSql;
//     //         break;
//     //     case "View All Departments":
//     //         query = "department";
//     //         sql = selectSql;
//     //         break;
//     //     case "Add Employee":
//     //         query = "employee";
//     //         sql = insertSql;
//     //         break;
//     //     case "Add roles":
//     //         query = "roles"
//     //         sql = insertSql;
//     //         break;
//     //     case "Add department":
//     //         query = "department"
//     //         const departmentNameResponse = inquirer.prompt({
//     //             type: 'input',
//     //             name: 'departmentName',
//     //             message: 'What is the name of the new deapartment to add?'
//     //         });
//     //         insertSql = `INSERT INTO ${query} (department_name) VALUES ( "${departmentNameResponse.departmentName}");`;
//     //         break;
//     //     default:
//     //         query = "employee"
//     //         break;
//     // }

//     // if (sql === insertSql) {
//     //     queryDatabase(query);
//     // } else {
//     //     selectSql = `SELECT * FROM ${query};`;
//     //     queryDatabase(query);
//     // }
//     } catch (err) {
//         if (err.isTtyError) {
//             console.log("Error couldn't be rendered in current environment", err);
//         } else {
//             console.log("Something else went wrong", err);
//         }
//     }
// };

// startApp();

// //ROUTES FOR REQUESTS
// //query database for get all of a selected endPoint in table format

// // const queryDatabase = (endPoint) => {
// //     console.log(endPoint, 'endPoint under function declaration');
    
// //     const sql = `SELECT * FROM ${endPoint};`;
// //     // const sql = 'SELECT * FROM your_table';

// //     db.query(sql, (err, result) => {
       
// //         if (err) {
// //             console.log(err);
// //         }

// //         console.log(result);
// //     });
// // };