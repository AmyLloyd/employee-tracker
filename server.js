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

//
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

    console.log(menuChoices[0]);
//inquirer asks the prompts and returns a response
inquirer
    .prompt([
        {
            type: "list",
            message: "What would you like to do? (Use arrow keys)",
            name: "menuChoice",
            choices: menuChoices,
        },
    ])
    .then((menuChoice) => {
        console.log(menuChoice);
        console.log(menuChoices[0]);
        if (menuChoice === menuChoices[0]) {
            // Query database
            db.query('SELECT * FROM department', function (err, results) {
            err ? console.log(err) : console.log(results); 
        }
        else if (menuChoice === menuChoices[3]) {
            db.query('SELECT * FROM roles', function(err, results) {
                err ? console.log(err) : console.log(results);
            })
        });
        }
    })

db.query('SELECT * FROM roles', function (err, results) {
    err ? console.log(err) : console.log(results);
});




//     // Default response for any other request (Not Found)
// app.use((req, res) => {
//     res.status(404).end();
//   });
  
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
  