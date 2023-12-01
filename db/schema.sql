--creates the database --

DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

--targets the database --
USE employees_db;

-- creates table including some relationships --

DROP TABLE IF EXISTS department;
CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY,
    _name VARCHAR(30)
);

DROP TABLE IF EXISTS role;
CREATE TABLE role (
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(30), 
    salary DECIMAL,
    department_id 
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL
);