// NPM Dependencies
const cTable = require('console.table');
const inquirer = require('inquirer')


// My Dependencies
const connection = require("./config/connection.js");

// Defined a menu using inquirer
const mainMenu = () => {
    inquirer.prompt({
        type: "list",
        name: "choice",
        message: 'What would you like to do?',
        choices: [
            "View All Employees",
            "View All Employees by Department",
            // "View All Employees by Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            // "Update Employee Manager",
            "View All Roles",
            "Add Role",
            "Remove Role",
            "View All Departments",
            "Add Department",
            "Remove Department",
            'Exit'
        ]
    }).then(function (res) {
        let pick = res.choice
        if (pick === "View All Employees") {
            viewEmployees()
        }
        if (pick === "View All Employees by Department") {
            viewEmpByDept()
        }
        // if (pick === "View All Employees by Manager") {

        // }
        if (pick === "Add Employee") {
            addEmploy()
        }
        if (pick === "Remove Employee") {
            delEmploy()
        }
        if (pick === "Update Employee Role") {
            updateEmp()
        }
        // if (pick === "Update Employee Manager") {

        // }
        if (pick === "View All Roles") {
            viewRoles();
        }
        if (pick === "Add Role") {
            addRole();
        }
        if (pick === "Remove Role") {
            delRole();
        }
        if (pick === "View All Departments") {
            viewDepts();
        }
        if (pick === "Add Department") {
            addDept();
        }
        if (pick === "Remove Department") {
            delDept();
        }
        if (pick === "Exit") {
            console.log('Connection ended')
            connection.end();
        }
    })
}
// End of MAIN MENU

// Start of app.
mainMenu();

// Department CRUD
const addDept = () => {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "Please enter the department title..."
        }
    ]).then(function (input) {
        connection.query("INSERT INTO departments SET ?", { name: input.department }, function (err) {
            if (err) throw err;
            console.log(`\n The ${input.department} department has been added to the database  \n`)
        })
        mainMenu()
    })
}
const delDept = () => {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "Which department would you like to remove?"
        }
    ]).then(function (input) {
        connection.query("DELETE FROM departments WHERE ?", { name: input.department }, function (err) {
            if (err) throw err;
            console.log(`\n The ${input.department} department has been deleted from the database \n`)
        })
        mainMenu()
    })
}
const viewDepts = () => {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        //Need to display the data as a table using console.table
        console.table(res)
        mainMenu()
    })
}

// Roles CRUD
const addRole = () => {
    // First get the departments available to us to add roles to:
    connection.query("SELECT * FROM departments", function (err, results) {
        if (err) throw err;
        // Begin prompts to ask for the department and define the role:
        inquirer.prompt([
            {
                type: "list",
                name: "dept",
                message: 'Which department does this role belong to?',
                // I loop through the department results to display choices
                choices: () => {
                    let choiceArr = [];
                    (results.forEach(e => {
                        choiceArr.push(e.name)
                    }))
                    return choiceArr;
                }
            },
            {
                name: "title",
                type: "input",
                message: "What is the title of the role?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of the role?",
                // Added validation to ensure a salary is a number
                validate: (value) => {
                    if (!isNaN(value)) {
                        return true;
                    }
                    return false
                }
            }
        ]).then(function (answer) {
            // need to find 'answer.dept' in my results array and get back the department id
            let depId;
            for (let i = 0; i < results.length; i++) {
                if (results[i].name === answer.dept) {
                    depID = results[i].id
                }
            }
            // Finally send all the object data via the INSERT query 
            connection.query("INSERT INTO roles SET ?", { title: answer.title, salary: answer.salary, department_id: depId }, function (err) {
                if (err) throw err;
                console.log(`\n The ${answer.title} role has been added to the database \n`);
                mainMenu();
            })

        })
    })
}
const delRole = () => {
    // Start by obtaining all the roles available
    connection.query("SELECT * FROM roles", function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                name: "role",
                message: 'Which role would you like to delete?',
                // I loop through the role results to display choices
                choices: () => {
                    let choiceArr = [];
                    (results.forEach(role => {
                        choiceArr.push(role.title)
                    }))
                    return choiceArr;
                }
            }]).then(function (answer) {
                connection.query("DELETE FROM roles WHERE ?", { title: answer.role }, function (err) {
                    if (err) throw err;
                    console.log(`\n The ${answer.role} role has been deleted from the database \n`)
                    mainMenu()
                })
            })
    })
}

const viewRoles = () => {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        //Need to display the data as a table using console.table
        console.table(res)
        mainMenu()
    })
}

// Employee CRUD
const addEmploy = () => {
    // First get the roles list to assign to an employee:
    connection.query("SELECT * FROM roles", function (err, results) {
        if (err) throw err;
        // Begin prompts to ask for the role assignment and employee data:
        inquirer.prompt([
            {
                type: "list",
                name: "title",
                message: 'Which role should the employee be assigned?',
                // I loop through the role results to display choices
                choices: () => {
                    let choiceArr = [];
                    (results.forEach(e => {
                        choiceArr.push(e.title)
                    }))
                    return choiceArr;
                }
            },
            {
                name: "firstName",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the employee's last name?",
            }
        ]).then(function (answer) {
            // need to find 'answer.title' in my results array and get back the role id
            let roleId;
            for (let i = 0; i < results.length; i++) {
                if (results[i].title === answer.title) {
                    roleId = results[i].id
                }
            }
            // Finally send all the object data via the INSERT query 
            connection.query("INSERT INTO employees SET ?", { first_name: answer.firstName, last_name: answer.lastName, role_id: roleId }, function (err) {
                if (err) throw err;
                console.log(`\n ${answer.first_name} ${answer.last_name} has been added to the employee database \n`);
                mainMenu();
            })
        })
    })
}

const viewEmployees = () => {
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        console.table(res)
        mainMenu()
    })
}

const delEmploy = () => {
    // Start by obtaining all the employees available
    connection.query("SELECT * FROM employees", function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: 'Which employee would you like to terminate?',
                // I loop through the employees results to display choices, I need to join first and last names
                choices: () => {
                    let choiceArr = [];
                    (results.forEach(obj => {
                        choiceArr.push(`${obj.last_name}, ${obj.first_name}`)
                    }))
                    return choiceArr;
                }
            }]).then(function (answer) {
                let nameArray = answer.employee.split(", ", 2)
                let firstName = nameArray[1];
                let lastName = nameArray[0];
                connection.query("DELETE FROM employees WHERE first_name = ? AND last_name = ?", [firstName, lastName], function (err) {
                    if (err) throw err;
                    console.log(`\n The ${firstName} ${lastName} has been removed from the database. Tell them to pack their shit up and get out of here.\n`)
                    mainMenu()
                })
            })
    })
}
const updateEmp = () => {
    connection.query("SELECT * FROM employees", function (err, employees) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: 'Which employee would you like to reassign a role?',
                // I loop through the employees results to display choices, I need to join first and last names
                choices: () => {
                    let choiceArr = [];
                    (employees.forEach(employee => {
                        choiceArr.push(`${employee.last_name}, ${employee.first_name}`)
                    }))
                    return choiceArr;
                }
            }]).then(function (answer) {
                let nameArray = answer.employee.split(", ", 2)
                // Create semantical variables:
                let firstName = nameArray[1];
                let lastName = nameArray[0];
                connection.query("SELECT * FROM roles", function (err, roles) {
                    if (err) throw err;
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "role",
                            message: `Please select a role to be assigned to ${firstName} ${lastName}:`,
                            // I loop through the employees results to display choices, I need to join first and last names
                            choices: () => {
                                choiceArr = [];
                                (roles.forEach(role => {
                                    choiceArr.push(role.title)
                                }))
                                return choiceArr;
                            }
                        }]).then((answer) => {
                            console.log(`Attempting to update ${firstName} ${lastName}'s role to: ${answer.role}...`)
                            let roleId;
                            connection.query("SELECT id FROM roles WHERE title = ?", answer.role, function (err, res) {
                                if (err) throw err;
                                roleId = res[0].id
                                console.log(`Applying new role Id: ${roleId}`)
                                // Need to create a new function because I can't pass the roleId variable to another .then()
                                return updateEmployeeRecord(roleId, firstName, lastName);
                            })
                        })
                })
            })

    })
} // End of updateEmp function

const updateEmployeeRecord = (roleId, firstName, lastName) => {
    connection.query("UPDATE employees SET ? WHERE first_name = ? AND last_name = ?", [{ role_id: roleId }, firstName, lastName], function (err) {
        if (err) throw err;
        console.log(`\n ${firstName} ${lastName}'s role has been updated.\n`)
        mainMenu()
    })
}

// View Employees by Department Query
const viewEmpByDept = () => {
    // First get the departments available to us to add roles to:
    connection.query("SELECT * FROM departments", function (err, results) {
        if (err) throw err;
        // Begin prompts to ask for the department and define the role:
        inquirer.prompt([
            {
                type: "list",
                name: "dept",
                message: 'Choose a department to view employees:',
                // I loop through the department results to display choices
                choices: () => {
                    let choiceArr = [];
                    (results.forEach(e => {
                        choiceArr.push(e.name)
                    }))
                    return choiceArr;
                }
            }
        ]).then(function (answer) {
            connection.query(`
            SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS departmentName
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    WHERE departments.name = ?`, [answer.dept], function (err, res) {
                if (err) throw err;
                //Need to display the data as a table using console.table\
                console.table(res)
                mainMenu()
            })
        })
    })
}