const inquirer = require('inquirer');
const mysql = require('mysql2');
const generateDatabase = require('./utils/generateDatabase');

const promtMain = [
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
        name: 'budget by department',
        message: "Which department's total utilized budget would you like to view?",
        choices: [],
    },
];

const promptUpdateEmployeeRole = [
    {
        type: 'list',
        name: 'update role for',
        message: "Which employee's role do you want to update?",
        choices: [],
    },
    {
        type: 'list',
        name: 'update employee role',
        message: "Which role do you want to assign the selected employee?",
        choices: [],
    },
];

const promptUpdateEmployeeManager = [
    {
        type: 'list',
        name: 'update manager for',
        message: "Which employee's manager do you want to update?",
        choices: [],
    },
    {
        type: 'list',
        name: 'update employee manager',
        message: "Which manager do you want to assign the selected employee?",
        choices: [],
    },
];

const promptAddEmployee = [
    {
        type: 'input',
        name: 'add employee first name',
        message: "What is the employee's first name?",
    },
    {
        type: 'input',
        name: 'add employee last name',
        message: "What is the employee's last name?",
    },
    {
        type: 'list',
        name: 'add employee role',
        message: "What is the employee's role?",
        choices: [],
    },
    {
        type: 'list',
        name: 'add employee manager',
        message: "Who is the employee's manager?",
        choices: [],
    },
];

const promptAddRole = [
    {
        type: 'input',
        name: 'add role name',
        message: 'What is the name of the role?',
    },
    {
        type: 'input',
        name: 'add role salary',
        message: 'What is the salary of the role?',
    },
    {
        type: 'list',
        name: 'add role department',
        message: 'Which department does the role belong to?',
        choices: [],
    },
];

const promptAddDepartment = [
    {
        type: 'input',
        name: 'add department',
        message: 'What is the name of the department?',
    },
];

const promptDeleteEmployee = [
    {
        type: 'list',
        name: 'delete employee',
        message: 'What is the name of the employee?',
        choices: [],
    },
    {
        type: 'confirm',
        name: 'confirm delete employee',
        message: 'Are you sure you want to delete this employee?',
    },
];

const promptDeleteRole = [
    {
        type: 'list',
        name: 'delete role',
        message: 'What is the name of the role?',
        choices: [],
    },
    {
        type: 'confirm',
        name: 'confirm delete role',
        message: 'Are you sure you want to delete this role?',
    },
];

const promptDeleteDepartment = [
    {
        type: 'list',
        name: 'delete department',
        message: 'What is the name of the department?',
        choices: [],
    },
    {
        type: 'confirm',
        name: 'confirm delete department',
        message: 'Are you sure you want to delete this department?',
    },
];