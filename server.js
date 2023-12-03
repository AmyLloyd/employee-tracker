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
    .then((response) => {
        if (response.menuChoice === menuChoices[0]) {
            // Query 

        } 
        // other conditions
        else if (response.menuChoices === menuChoices[3]) {

        }
    });

//write queries to test outside of promise
db.query('SELECT * FROM roles', function (err, results) {
    err ? console.log(err) : console.log(results);
});

//ROUTES FOR REQUESTS

//get all departments in table format
app.get("/department", (req, res) => {
    const sql = `SELECT * FROM department`;
    
    db.query(sql, function (err, results) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: results,
        });
    });
});

//get all roles
app.get("/roles", (req, res) => {
    const sql = `SELECT * FROM roles`;

    db.query('SELECT * FROM roles', function (err, results) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: results,
        });
    });
});

// get all employees
app.get("/employee", (req, res) => { // ... your code to fetch employees ... }); 
    const sql = `SELECT * FROM employee`;

    db.query(sql, function (err, results) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: "success",
            data: body,
        });
    });
});



    // Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});