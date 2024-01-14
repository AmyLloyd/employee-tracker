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

 const inquirer = require("inquirer");

 //import dotenv
require('dotenv').config();

//create main function
const main = async () => {
    try {
        console.log("here");
        //userChoice is response to inquirer prompt
        const userChoice = 
        await inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "menuChoice",
                choices: [
                    "View All Employees",
                    "Add Employee",
                    "Update Employee Role",
                    "View All Roles",
                    "Add Role",
                    "View All Departments",
                    "Add Department"],
            },
        ]);

        console.log(userChoice, "userChoice");

        let endPoint;
        switch (userChoice.menuChoice) {
            case "View All Employees":
                endPoint = "employee"
                break;
            case "Add Employee":
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

    const sql = `SELECT * FROM ${endPoint};`;

    db.query(sql, (err, result) => {

        if (err) {

            console.log(err);
          return;
        }
        console.log(result);
      });
};