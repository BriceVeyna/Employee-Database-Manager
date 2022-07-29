const inquirer = require('inquirer');
const mysql = require('mysql2');
// const generateDatabase = require('./utils/generateDatabase');

// Global list variables
const employeeList = [];
const roleList = [];
const departmentList = [];

// Promt variables
const promptMain = [
    {
        type: 'list',
        name: 'main menu',
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
        name: 'employee_id',
        message: "Which employee's role do you want to update?",
        choices: employeeList,
    },
    {
        type: 'list',
        name: 'role_id',
        message: "Which role do you want to assign the selected employee?",
        choices: roleList,
    },
];

const promptUpdateEmployeeManager = [
    {
        type: 'list',
        name: 'employee_id',
        message: "Which employee's manager do you want to update?",
        choices: employeeList,
    },
    {
        type: 'list',
        name: 'manager_id',
        message: "Which manager do you want to assign the selected employee?",
        choices: employeeList,
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
        name: 'role_id',
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
        name: 'department_id',
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
        name: 'employee_id',
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
        name: 'role_id',
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
        name: 'department_id',
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
        user: '',
        password: '',
        database: 'company_db'
    },
    console.log('Connected to the database')
);

// Display main prompt, hand off to next prompt
function displayMain() {
    inquirer
        .prompt(promptMain)
        .then((response) => {
            if (response.includes("View All Employees")) {
                viewAllEmployees();
            } else if (response.includes("View All Roles")) {
                viewAllRoles();
            } else if (response.includes("View All Departments")) {
                viewAllDepartments();
            } else if (response.includes("View Employees By Manager")) {
                viewEmployeesByManager();
            } else if (response.includes("View Employees By Department")) {
                viewEmployeesByDepartment();
            } else if (response.includes("View Total Utilized Budget By Department")) {
                viewBudgetByDepartment();
            } else if (response.includes("Update Employee Role")) {
                updateEmployeeRole();
            } else if (response.includes("Update Employee Manager")) {
                updateEmployeeManager();
            } else if (response.includes("Add Employee")) {
                addEmployee();
            } else if (response.includes("Add Role")) {
                addRole();
            } else if (response.includes("Add Department")) {
                addDepartment();
            } else if (response.includes("Delete Employee")) {
                deleteEmployee();
            } else if (response.includes("Delete Role")) {
                deleteRole();
            } else if (response.includes("Delete Department")) {
                deleteDepartment();
            } else {
                db.end();
            }
        });
}

// View functions
function viewAllEmployees() {
    const viewEmployees = 'SELECT * FROM employee';
    db.connect(async function(err) {
        if(err) throw err;
        await db.query(viewEmployees, function(err, results) {
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
        await db.query(viewRoles, function(err, results) {
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
        await db.query(viewDepartments, function(err, results) {
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
        await db.query(viewEmployeesByManager, function(err, results) {
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
        await db.query(viewEmployeesByDepartment, function(err, results) {
            if(err) throw err;
            console.table(results);
        });
    });
    displayMain();
}

async function viewBudgetByDepartment() {
    inquirer
        .prompt(promptBudgetByDepartment)
        .then((response) => {
            await db.query()
            await displayMain();
        });
}

// Update functions
async function updateEmployeeRole() {
    inquirer
        .prompt(promptUpdateEmployeeRole)
        .then((response) => {
            await db.connect(function(err) {
                if(err) throw err;
                db.query()
            })
            await displayMain();
        });
}

async function updateEmployeeManager() {
    inquirer
        .prompt(promptUpdateEmployeeManager)
        .then((response) => {
            await db.connect(function(err) {
                if(err) throw err;
                db.query()
            })
            await displayMain();
        });
}

// Add functions
function addEmployee() {
    inquirer
        .prompt(promptAddEmployee)
        .then(async (response) => {
            let firstName = response.first_name;
            let lastName = response.last_name;
            let roleName = response.role_id;
            let managerFirstName = response.manager_id.split(" ")[0];
            let managerLastName = response.manager_id.split(" ")[1];
            let roleID = `SELECT id FROM employee_role WHERE title="${roleName}"`;
            let managerID = `SELECT id FROM employee WHERE (first_name="${managerFirstName}", last_name="${managerLastName}")`;
            const insertEmployee = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${roleID}, ${managerID})`;
            await db.connect(async function(err) {
                if(err) throw err;
                await db.query(roleID, function (err, result) {
                    if(err) throw err;
                    roleID = result;
                })
                await db.query(managerID, function (err, result) {
                    if(err) throw err;
                    managerID = result;
                })
                await db.query(insertEmployee, function (err) {
                    if(err) throw err;
                })
            });
            displayMain();
        });
}

async function addRole() {
    inquirer
        .prompt(promptAddRole)
        .then((response) => {
            let roleName = response.role_name;
            let roleSalary = response.role_salary;
            let departmentName = response.department_id;
            const departmentID = `SELECT id FROM department WHERE department_name="${departmentName}"`;
            const insertRole = `INSERT INTO employee_role (role_name, role_salary, department_id) VALUES ("${roleName}", "${roleSalary}", ${departmentID})`;
            await db.connect(function(err) {
                if(err) throw err;
                db.query(insertRole, function (err, results) {
                    if(err) throw err;
                })
            });
            await displayMain();
        });
}

async function addDepartment() {
    inquirer
        .prompt(promptAddDepartment)
        .then((response) => {
            let departmentName = response.department_name;
            const insertDepartment = `INSERT INTO department (department_name) VALUES ("${departmentName}")`;
            await db.connect(function(err) {
                if(err) throw err;
                db.query(insertDepartment, function (err, results) {
                    if(err) throw err;
                })
            })
            await displayMain();
        });
}

// Delete functions
async function deleteEmployee() {
    inquirer
        .prompt(promptDeleteEmployee)
        .then((response) => {
            await db.connect(function(err) {
                if(err) throw err;
                db.query()
            })
            await displayMain();
        });
}

async function deleteRole() {
    inquirer
        .prompt(promptDeleteRole)
        .then((response) => {
            await db.connect(function(err) {
                if(err) throw err;
                db.query()
            })
            await displayMain();
        });
}

async function deleteDepartment() {
    inquirer
        .prompt(promptDeleteDepartment)
        .then((response) => {
            await db.connect(function(err) {
                if(err) throw err;
                db.query()
            })
            await displayMain();
        });
}

// Initialize connection to database and start program
db.connect(function(err) {
    if(err) throw err;
    displayMain();
});