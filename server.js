
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
                viewAllEmployee();
                break;
            case "View All Roles":
                endPoint = "roles"
                // method = "select"
                selectQuery(endPoint);
                break;
            case "View All Departments":
                endPoint = "department"
                // method = "select"
                selectQuery(endPoint);
                break;
            case "Add Employee":
                endPoint = "employee"
                addEmployee();
                break;
            case "Add Role":
                endPoint = "roles"
                addRole();
                break;
            case "Add Department":
                endPoint = "department"
                addDepartment();
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
const selectQuery = async (endPoint) => {
    try {
     
        const [results] = await db.promise().query(`SELECT * FROM ${endPoint}`);

        console.table(results);
        main();
    
    } catch(err) {
        console.log(err);
    }
};   

const viewAllEmployee = async () => {
    try {
        const [results] = await db.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.department_name AS department,
        //roles.salary, employee.manager_id FROM ((employee INNER JOIN roles ON employee.roles_id = roles.id) INNER JOIN department ON roles.department_
        //id = department.id);`);

        console.table(results);
        main();

    } catch (err) {
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

        const [results] = await db.promise().query(`INSERT INTO employee(first_name, last_name, roles_id, manager_id)
        values ('${userChoice.first_name}', '${userChoice.last_name}', ${userChoice.roles_id}, ${userChoice.manager_id});`);

        const [updatedEmployees] = await db.promise().query(`SELECT * FROM employee`);

        console.table(updatedEmployees);

        main();

    } catch(err) {
        console.log(err);
    }   
};

const addDepartment = async () => {
    try {
        console.log('addDepartment function running');
        const userChoice = await inquirer.prompt([
            {
            type: "input",
            message: "What is the name of the new department?",
            name: "department_name",
            }
        ])       

        const [results] = await db.promise().query(`INSERT INTO department(department_name)
        values ('${userChoice.department_name}')`);

        const [updatedDepartments] = await db.promise().query(`SELECT * FROM department`);

        console.table(updatedDepartments);

        main();

    } catch(err) {
        console.log(err);
    }   
};

const addRole = async () => {
    try {

        const [departments] = await db.promise().query(`SELECT * FROM department`);
        const userChoice = await inquirer.prompt([{
            type: "input",
            message: "What is the title of the new role?",
            name: "title",
        },
        {
            type: "input",
            message: "What is the salary of the new role?",
            name: "salary", 
            default: "Enter salary in this form: 30000",
        },
        {
            type: "list",
            message: "Please select the department for the new role.",
            name: "department_id",   
            choices: departments.map(({id, department_name }) => ({ value: id, name: department_name }))
        }
        ])       

        const [results] = await db.promise().query(`INSERT INTO roles(title, salary, department_id)
        values ('${userChoice.title}', ${userChoice.salary}, ${userChoice.department_id});`);

        const [updatedRoles] = await db.promise().query(`SELECT * FROM roles`);

        console.table(updatedRoles);

        main();

    } catch(err) {
        console.log(err);
    }   
};

const updateEmployee = async () => {
    try {
        const [employees] = await db.promise().query(`SELECT * FROM employee`);
        console.log(employees);
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

        const [results] = await db.promise().query(`UPDATE employee SET roles_id = ${userChoice.role_id} WHERE id = ${userChoice.employee_id};`);

        const [updatedRoles] = await db.promise().query(`SELECT employee.first_name, employee.last_name, roles.title, roles.salary FROM employee INNER JOIN roles ON roles.id = employee.roles_id;`);

        console.table(updatedRoles);

        main();


    } catch(err) {
        console.log(err);
    }   
}
