const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.PASSWORD,
    database: 'employees_db',
});

const questions = () => {
    inquirer.prompt([
        {
        type: 'list',
        message: "What would you like to do?",
        name: 'action',
        choices: ["View All Employees", "View All Employees by Department", "View All Employees by Role", "Add Department", "Add Employee", "Add Job Title", "Update Employee Title",]
        }
    ])
    .then((data) => {
        console.log("selection: ", choices);
        switch(selection) {
            case "View All Employees":
                console.log("selection ", selection);
                viewAllEmployees();
                break;
            case "View All Employees by Department":
                console.log("selection", selection);
                viewAllEmployeesbyDepartment();
                break;
            case "View All Employees by Role":
                console.log("selection ", selection);
                viewAllEmployeesbyRole();
                break;
            case "Add Department":
                console.log("selection", selection);
                addDepartment();
                break;
            case "Add Employee":
                console.log("selection ", selection);
                addEmployee();
                break;
            case "Add Job Title":
                console.log("selection", selection);
                addJobTitle();
                break;
            case "Update Employe Title":
                console.log("selection", selection);
                updateEmployeeTitle();
                break;
            default:
                console.log("try again");
                break;
        };
    })
}

connection.connect((err) => {
    if (err) throw err;
    console.log(`working with ID ` + connection.threadId);
    questions();
});