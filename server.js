
//import dotenv
require('dotenv').config();

//Import and require mysql2
const mysql = require('mysql2');

//Connect to database 
const db = mysql.createConnection(
    {
    host: 'localhost',
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    },
);

db.connect(function (error) {
    if(error) {
        console.log(error) 
        throw error; 
    }
});

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

let endpoint;
let method;
//create main function
async function main() {
  try {
    //userChoice is response to inquirer prompt
    const userChoice = await inquirer.prompt(question);
        let endPoint;
        switch (userChoice.menuChoice) {
            case "View All Employees":
                endPoint = "employee"
                method = "select"
                selectQuery(endPoint);
                break;
            case "View All Roles":
                endPoint = "roles"
                method = "select"
                break;
            case "View All Departments":
                endPoint = "department"
                method = "select"
                break;
            case "Add Employee":
                endPoint = "employee"
                method = "insert"
                addEmployee();
                break;
            case "Add Role":
                endPoint = "roles"
                method = "insert"
                break;
            case "Add department":
                endPoint = "department"
                method = "insert"
                break;
            case "Update Employee Role":
                endPoint = "employee"
                method = "update"
                updateEmployee();
                break;
            default:
                endPoint = "employee"
                method = "select"
                break;
        }

    } catch (err) {
        console.error(err, "Error occurred")
    }
};
main();

//ROUTES FOR REQUESTS
//query database for get all of a selected endPoint in table format
//Use this endpoint for View all employees: SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.department_name AS department,
 //roles.salary FROM ((employee INNER JOIN roles ON employee.roles_id = roles.id) INNER JOIN department ON roles.department_
 //id = department.id);
 //Need to add last column of manager but this works. 
const selectQuery = async (endPoint) => {
    try {
        const [results] = await db.promise().query(`SELECT *, ${roles.title} FROM ${endPoint} INNER JOIN ${roles} ON ${endPoint}.roles_id = roles.id`);

        console.table(results);
        main();
    
    } catch(err) {
        console.log(err);
    }
};   

const addEmployee = async () => {
    try {

        const [employees] = await db.promise().query(`SELECT * FROM employee`);
        const [roles] = await db.promise().query(`SELECT * FROM roles`);
        const userChoice = await inquirer.prompt([{
            type: "input",
            message: "What is the employees first name?",
            name: "first_name",
        },
        {
            type: "input",
            message: "What is the employees last name?",
            name: "last_name", 
        },
        {
            type: "list",
            message: "Please select a role from the list below.",
            name: "roles_id",   
            choices: roles.map(({id, title }) => ({ value: id, name: title }))
        },
        {
            type: "list",
            message: "Who is the employee's manager?",
            name: "manager_id",   
            choices: employees.map(({ id, first_name, last_name }) => ({ value: id, name: `${first_name} ${last_name}`}))
        }
        ])

        main();

    } catch(err) {
        console.log(err);
    }   
}

const updateEmployee = async () => {
    try {
        const [employees] = await db.promise().query(`SELECT * FROM employee`);
        const [roles] = await db.promise().query(`SELECT * FROM roles`);
        const userChoice = await inquirer.prompt([
            {
                type: "list",
                message: "Please select an employee from the list below.",
                name: "employee_id",   
                choices: employees.map(({id, first_name, last_name }) => ({ value: id, name: `${first_name} ${last_name}` }))
            },
            {
                type: "list",
                message: `Please select a new role for the employee:`,
                name: "role_id",
                choices: roles.map(({ id, title }) => ({ value: id, name: title }))
            }

            
        ])
        console.log("Updated employee's role");

        main();

    } catch(err) {
        console.log(err);
    }   
}

const insertQuery = (endPoint) => {
    console.log('insertQuery begins')
    app.post(`/${endPoint}`, (req, res) => {
        const sql = `INSERT INTO ${endPoint}
        VALUES (?)`;
        //requires structure: INSERT INTO users (first_name, last_name, email, password, location, dept, is_admin, register_date) values ('Brad', 'Traversy', 'brad@gmail.com', '123456','Massachusetts', 'development', 1, now());
        db.query(sql, params, function (err, results) {
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
            //Log results to the terminal
            console.table(results);
            main();
        });
    });   
}

const updateQuery = (endPoint) => {
    app.put(`/${endPoint}`, (req, res) => {
        //Needs structure: UPDATE users SET email = 'freddy@gmail.com' WHERE id = 2;
        db.query(`UPDATE ${endPoint} SET ${endPoint} WHERE `), function (err, results) {

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
            //Log results to the terminal
            console.table(results);
            main();
        };
    });   
}