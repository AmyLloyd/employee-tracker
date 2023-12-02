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


