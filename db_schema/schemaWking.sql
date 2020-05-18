-- DROP DATABASE IF EXISTS personnel_db;
-- CREATE DATABASE personnel_db;

USE personnel_db;

CREATE TABLE departments (
id INT AUTO_INCREMENT NOT NULL,
name VARCHAR(100) NOT NULL,
PRIMARY KEY (id) 
);

SELECT * FROM departments;

-- INSERT INTO departments (name)
-- VALUES ("Accounting"),

CREATE TABLE roles (
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(100) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- INSERT INTO roles (title,salary)
-- VALUES ("Junior Accountant", 60000, )


CREATE TABLE employees (
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
PRIMARY KEY (id),
FOREIGN KEY (role_id) REFERENCES roles(id) 
);

-- set up foreign key: FOREIGN KEY (name of this tables column) REFERENCES nameOfForeignTable(nameOfForeignColumn) 