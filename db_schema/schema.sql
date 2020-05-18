DROP DATABASE IF EXISTS personnel_db;
CREATE DATABASE personnel_db;

USE personnel_db;

CREATE TABLE departments (
id INT AUTO_INCREMENT NOT NULL,
name VARCHAR(100) NOT NULL,
PRIMARY KEY (id) 
);

CREATE TABLE roles (
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(100) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
role_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES roles(id) 
);

-- Examples of tables to run
-- SELECT * FROM departments;
-- SELECT * FROM roles;
-- SELECT * FROM employees;
-- SELECT id FROM roles WHERE title = "Data Entry Assistant";

-- Example of Join
-- SELECT employees.id, employees.first_name, employees.last_name, employees.role_id, roles.id, roles.title, roles.salary, departments.name AS departmentName
-- FROM employees
-- LEFT JOIN roles ON employees.role_id = roles.id
-- LEFT JOIN departments ON roles.department_id = departments.id;
-- WHERE departments.name = "Merchandising";

-- set up foreign key: FOREIGN KEY (name of this tables column) REFERENCES nameOfForeignTable(nameOfForeignColumn) 