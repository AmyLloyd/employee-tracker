//import express.js server
const express = require('express');

//Import and require mysql2
const mysql = require('mysql2');

//identify PORT for use in heroku and local host 3001
const PORT = process.env.PORT || 3001;

//use an instance of express server as app
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

// import inquirer
 const inquirer = require("inquirer");

//ROUTES FOR REQUESTS
//query database for get all of a selected endPoint in table format

const queryDatabase = (endPoint) => {
    console.log(endPoint, 'endPoint under function declaration');
    
    const sql = `SELECT * FROM ${endPoint};`;
    // const sql = 'SELECT * FROM your_table';

    db.query(sql, (err, result) => {
       
        if (err) {
            console.log(err);
        }

        console.log(result);
    });
};


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


//create main function
const main = async () => {

        console.log("main function running");
        //object for inquirer prompt
        const question = 
        [{
            type: "list",
            message: "What would you like to do?",
            name: "menuChoice",
            choices: menuChoices,
        }];

        //userChoice is response to inquirer prompt
        inquirer.prompt(question).then(async (userChoice) => {
            console.log(userChoice.menuChoice);

        let sql;
        let query;
        let selectSql;
        let insertSql;     

        switch (userChoice.menuChoice) {            
            case "View All Employees":
                query = "employee";
                sql = selectSql;
                break;
            case "View All Role":
                query = "roles";
                sql = selectSql;
                break;
            case "View All Departments":
                query = "department";
                sql = selectSql;
                break;
            case "Add Employee":
                query = "employee";
                sql = insertSql;
                break;
            case "Add roles":
                query = "roles"
                sql = insertSql;
                break;
            case "Add department":
                query = "department"
                const departmentNameResponse = await inquirer.prompt({
                    type: 'input',
                    name: 'departmentName',
                    message: 'What is the name of the new deapartment to add?'
                });
                insertSql = `INSERT INTO ${query} (department_name) VALUES ( "${departmentNameResponse.departmentName}");`;
                break;
            default:
                query = "employee"
                break;
        }

        if (sql === insertSql) {
            await queryDatabase(query);
        } else {
            selectSql = `SELECT * FROM ${query};`;
            await queryDatabase(query);
        }          
    }).catch((err) => {
        console.error(err);
    });
};



main();

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  