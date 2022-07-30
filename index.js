const inquirer = require('inquirer');
const mysql = require('mysql2');
const util = require('util');
// const generateDatabase = require('./utils/generateDatabase');

// Global list variables
const employeeList = [];
const managerList = ['None'];
const roleList = [];
const departmentList = [];

// Promt variables
const promptMain = [
    {
        type: 'list',
        name: 'main_menu',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'View All Roles', 'View All Departments', 'View Employees By Manager', 'View Employees By Department', 'View Total Utilized Budget By Department', 'Update Employee Role', 'Update Employee Manager', 'Add Employee', 'Add Role', 'Add Department', 'Delete Employee', 'Delete Role', 'Delete Department', 'Quit']
    },
];

const promptBudgetByDepartment = [
    {
        type: 'list',
        name: 'department_id',
        message: "Which department's total utilized budget would you like to view?",
        choices: departmentList,
    },
];

const promptUpdateEmployeeRole = [
    {
        type: 'list',
        name: 'employee_name',
        message: "Which employee's role do you want to update?",
        choices: employeeList,
    },
    {
        type: 'list',
        name: 'role_name',
        message: "Which role do you want to assign the selected employee?",
        choices: roleList,
    },
];

const promptUpdateEmployeeManager = [
    {
        type: 'list',
        name: 'employee_name',
        message: "Which employee's manager do you want to update?",
        choices: employeeList,
    },
    {
        type: 'list',
        name: 'manager_name',
        message: "Which manager do you want to assign the selected employee?",
        choices: managerList,
    },
];

const promptAddEmployee = [
    {
        type: 'input',
        name: 'first_name',
        message: "What is the employee's first name?",
    },
    {
        type: 'input',
        name: 'last_name',
        message: "What is the employee's last name?",
    },
    {
        type: 'list',
        name: 'role_name',
        message: "What is the employee's role?",
        choices: roleList,
    },
    {
        type: 'list',
        name: 'manager_id',
        message: "Who is the employee's manager?",
        choices: employeeList,
    },
];

const promptAddRole = [
    {
        type: 'input',
        name: 'role_name',
        message: 'What is the name of the role?',
    },
    {
        type: 'input',
        name: 'role_salary',
        message: 'What is the salary of the role?',
    },
    {
        type: 'list',
        name: 'department_name',
        message: 'Which department does the role belong to?',
        choices: departmentList,
    },
];

const promptAddDepartment = [
    {
        type: 'input',
        name: 'department_name',
        message: 'What is the name of the department?',
    },
];

const promptDeleteEmployee = [
    {
        type: 'list',
        name: 'employee_name',
        message: 'What is the name of the employee?',
        choices: employeeList,
    },
    {
        type: 'confirm',
        name: 'delete_employee',
        message: 'Are you sure you want to delete this employee?',
    },
];

const promptDeleteRole = [
    {
        type: 'list',
        name: 'role_name',
        message: 'What is the name of the role?',
        choices: roleList,
    },
    {
        type: 'confirm',
        name: 'delete_role',
        message: 'Are you sure you want to delete this role?',
    },
];

const promptDeleteDepartment = [
    {
        type: 'list',
        name: 'department_name',
        message: 'What is the name of the department?',
        choices: departmentList,
    },
    {
        type: 'confirm',
        name: 'delete_department',
        message: 'Are you sure you want to delete this department?',
    },
];

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'company_db'
    },
    console.log('Connected to the database')
);

// Display main prompt, hand off to next prompt
function displayMain() {
    inquirer
        .prompt(promptMain)
        .then((response) => {
            if (response.main_menu.includes("View All Employees")) {
                viewAllEmployees();
            } else if (response.main_menu.includes("View All Roles")) {
                viewAllRoles();
            } else if (response.main_menu.includes("View All Departments")) {
                viewAllDepartments();
            } else if (response.main_menu.includes("View Employees By Manager")) {
                viewEmployeesByManager();
            } else if (response.main_menu.includes("View Employees By Department")) {
                viewEmployeesByDepartment();
            } else if (response.main_menu.includes("View Total Utilized Budget By Department")) {
                viewBudgetByDepartment();
            } else if (response.main_menu.includes("Update Employee Role")) {
                updateEmployeeRole();
            } else if (response.main_menu.includes("Update Employee Manager")) {
                updateEmployeeManager();
            } else if (response.main_menu.includes("Add Employee")) {
                addEmployee();
            } else if (response.main_menu.includes("Add Role")) {
                addRole();
            } else if (response.main_menu.includes("Add Department")) {
                addDepartment();
            } else if (response.main_menu.includes("Delete Employee")) {
                deleteEmployee();
            } else if (response.main_menu.includes("Delete Role")) {
                deleteRole();
            } else if (response.main_menu.includes("Delete Department")) {
                deleteDepartment();
            } else {
                db.end();
            }
        });
}

// Promisify database query and main function
db.queryPromise = util.promisify(db.query);

// View functions
function viewAllEmployees() {
    const viewEmployees = 'SELECT * FROM employee';
    db.connect(async function(err) {
        if(err) throw err;
        await db.queryPromise(viewEmployees, function(err, results) {
            if(err) throw err;
            console.table(results);
        });
    });
    displayMain();
}

function viewAllRoles() {
    const viewRoles = 'SELECT * FROM employee_role';
    db.connect(async function(err) {
        if(err) throw err;
        await db.queryPromise(viewRoles, function(err, results) {
            if(err) throw err;
            console.table(results);
        });
    });
    displayMain();
}

function viewAllDepartments() {
    const viewDepartments = 'SELECT * FROM department';
    db.connect(async function(err) {
        if(err) throw err;
        await db.queryPromise(viewDepartments, function(err, results) {
            if(err) throw err;
            console.table(results);
        });
    });
    displayMain();
}

function viewEmployeesByManager() {

    const viewEmployeesByManager = `SELECT * FROM employee WHERE manager_id = ${manager_id}`;
    db.connect(async function(err) {
        if(err) throw err;
        await db.queryPromise(viewEmployeesByManager, function(err, results) {
            if(err) throw err;
            console.table(results);
        });
    });
    displayMain();
}

function viewEmployeesByDepartment() {

    const viewEmployeesByDepartment = `SELECT * FROM employee WHERE department_id = ${department_id}`;
    db.connect(async function(err) {
        if(err) throw err;
        await db.queryPromise(viewEmployeesByDepartment, function(err, results) {
            if(err) throw err;
            console.table(results);
        });
    });
    displayMain();
}

function viewBudgetByDepartment() {
    inquirer
        .prompt(promptBudgetByDepartment)
        .then((response) => {
            db.connect(async function(err) {
                if(err) throw err;
                await db.queryPromise()
            })
            displayMain();
        });
}

// Update functions
function updateEmployeeRole() {
    inquirer
        .prompt(promptUpdateEmployeeRole)
        .then((response) => {
            const employeeFirstName = response.employee_name.split(" ")[0];
            const employeeLastName = response.employee_name.split(" ")[1];
            const updateRole = `UPDATE employee SET role_id = (SELECT id FROM employee_role WHERE title = "${response.role_name}") WHERE first_name = "${employeeFirstName}" AND last_name = "${employeeLastName}"`;
            db.connect(async function(err) {
                if(err) throw err;
                await db.queryPromise(updateRole, function (err) {
                    if(err) throw err;
                });
            });
            displayMain();
        });
}

function updateEmployeeManager() {
    inquirer
        .prompt(promptUpdateEmployeeManager)
        .then((response) => {
            const employeeFirstName = response.employee_name.split(" ")[0];
            const employeeLastName = response.employee_name.split(" ")[1];
            let updateManager = ``;
            if (response.manager_name === 'None') {
                updateManager = `UPDATE employee SET manager_id = NULL WHERE first_name = "${employeeFirstName}" AND last_name = "${employeeLastName}"`;
            } else {
                const managerFirstName = response.manager_name.split(" ")[0];
                const managerLastName = response.manager_name.split(" ")[1];
                updateManager = `UPDATE employee as e, (SELECT id FROM employee WHERE first_name = "${managerFirstName}" AND last_name = "${managerLastName}") as m SET e.manager_id = m.id WHERE first_name = "${employeeFirstName}" AND last_name = "${employeeLastName}"`;
            }
            db.connect(async function(err) {
                if(err) throw err;
                await db.queryPromise(updateManager, function (err) {
                    if(err) throw err;
                });
            });
            displayMain();
        });
}

// Add functions
function addEmployee() {
    inquirer
        .prompt(promptAddEmployee)
        .then((response) => {
            let full_name = response.first_name.concat(" ", response.last_name);
            employeeList.push(full_name);
            let managerFirstName = response.manager_id.split(" ")[0];
            let managerLastName = response.manager_id.split(" ")[1];
            let roleID = `SELECT id FROM employee_role WHERE title="${response.role_name}"`;
            let managerID = `SELECT id FROM employee WHERE (first_name="${managerFirstName}", last_name="${managerLastName}")`;
            const insertEmployee = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${response.first_name}", "${response.last_name}", ${roleID}, ${managerID})`;
            db.connect(async function(err) {
                if(err) throw err;
                await db.queryPromise(roleID, function (err, result) {
                    if(err) throw err;
                    roleID = result;
                })
                await db.queryPromise(managerID, function (err, result) {
                    if(err) throw err;
                    managerID = result;
                })
                await db.queryPromise(insertEmployee, function (err) {
                    if(err) throw err;
                })
            });
            displayMain();
        });
}

function addRole() {
    inquirer
        .prompt(promptAddRole)
        .then((response) => {
            roleList.push(response.role_name);
            const departmentID = `SELECT id FROM department WHERE department_name="${response.department_name}"`;
            const insertRole = `INSERT INTO employee_role (role_name, role_salary, department_id) VALUES ("${response.role_name}", "${response.role_salary}", ${departmentID})`;
            db.connect(async function(err) {
                if(err) throw err;
                await db.queryPromise(insertRole, function (err, results) {
                    if(err) throw err;
                })
            });
            displayMain();
        });
}

function addDepartment() {
    inquirer
        .prompt(promptAddDepartment)
        .then((response) => {
            departmentList.push(response.department_name)
            const insertDepartment = `INSERT INTO department (department_name) VALUES ("${response.department_name}")`;
            db.connect(async function(err) {
                if(err) throw err;
                await db.queryPromise(insertDepartment, function (err, results) {
                    if(err) throw err;
                })
            })
            displayMain();
        });
}

// Delete functions
function deleteEmployee() {
    inquirer
        .prompt(promptDeleteEmployee)
        .then((response) => {
            if (response.delete_employee === true) {
                const deleteAnEmployee = `DELETE FROM employee WHERE first_name = SUBSTRING_INDEX(${response.employee_name}, ' ', 1) AND last_name = SUBSTRING_INDEX(${response.employee_name}, ' ', 2)`;
                db.connect(async function(err) {
                    if(err) throw err;
                    await db.queryPromise(deleteAnEmployee, function (err) {
                        if(err) throw err;
                    });
                });
                displayMain();
            } else {
                displayMain();
            }
        });
}

function deleteRole() {
    inquirer
        .prompt(promptDeleteRole)
        .then((response) => {
            if (response.delete_role === true) {
                const deleteARole = `DELETE FROM employee_role WHERE title = ${response.role_name}`;
                db.connect(async function(err) {
                    if(err) throw err;
                    await db.queryPromise(deleteARole, function (err) {
                        if(err) throw err;
                    });
                });
                displayMain();
            } else {
                displayMain();
            }
        });
}

function deleteDepartment() {
    inquirer
        .prompt(promptDeleteDepartment)
        .then((response) => {
            if (response.delete_department === true) {
                const deleteADepartment = `DELETE FROM department WHERE department_name = ${response.department_name}`;
                db.connect(async function(err) {
                    if(err) throw err;
                    await db.queryPromise(deleteADepartment, function (err) {
                        if(err) throw err;
                    });
                });
                displayMain();
            } else {
                displayMain();
            }
        });
}

// Initialize connection to database and start program
function init() {
        const employees = "SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM employee";
        const roles = 'SELECT title FROM employee_role';
        const departments = 'SELECT department_name FROM department';
        db.query(employees, function (err, results) {
            if(err) throw err;
            for (let i = 0; i < results.length; i++) {
                employeeList.push(results[i].full_name);
                managerList.push(results[i].full_name);
            }
            // console.log(employeeList);
        });
        db.query(roles, function (err, results) {
            if(err) throw err;
            for (let i = 0; i < results.length; i++) {
                roleList.push(results[i].title);
            }
            // console.log(roleList);
        })
        db.query(departments, function (err, results) {
            if(err) throw err;
            for (let i = 0; i < results.length; i++) {
                departmentList.push(results[i].department_name);
            }
            // console.log(departmentList);
        })
    displayMain();
}

init();

