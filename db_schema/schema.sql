DROP DATABASE IF EXISTS personnel_db;

CREATE DATABASE personnel_db;

USE personnel_db;

CREATE TABLE departments (
id INT AUTO_INCREMENT NOT NULL,
name VARCHAR(100) NOT NULL
);

CREATE TABLE roles (
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(100) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT
);

CREATE TABLE employees (
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
PRIMARY KEY (id) 
);

-- Make an example employee

-- Example Role

-- Example Department


-- This is for querying all employees
SELECT employee.id, employee.first_name, employee.last_name,
	role.title, role.salary, department.name AS departmentName
FROM employee
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id;