const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

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
    .then((answer) => {
        console.log("success");
        switch(answer.action) {
            case "View All Employees":
                viewAllEmployees();
                break;
            case "View All Employees by Department":
                viewAllEmployeesbyDepartment();
                break;
            case "View All Employees by Role":
                viewAllEmployeesbyRole();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Add Job Title":
                addJobTitle();
                break;
            case "Update Employe Title":
                updateEmployeeTitle();
                break;
            default:
                console.log("try again");
                break;
        };
    });
};


const viewAllEmployees = () => {
    console.log("hi");
    let query = 'SELECT employee.first_name, employee.last_name, roles.title, roles.salary ';
    query += "FROM employee INNER JOIN roles ON (employee.role_id = roles.id)";

    connection.query(query, (err, res) => {
        const peopleArray = []
        res.forEach(( { first_name, last_name, title, salary }, i) => {
          const num = i + 1;
          const peopleObject = {
            "ID ": num, 
            "First Name":  first_name, 
            "Last Name": last_name,
            "Title": title,
            "Salary": salary,
          }
          peopleArray.push(peopleObject);
        });
        console.table(peopleArray);
        questions();
    });
};

const viewAllEmployeesbyDepartment = () => {
    inquirer 
        .prompt({
            name: 'department',
            type: "list",
            message: "Which Department?",
            choices: ["Sales", "Engineering", "Finance", "Legal"]
    })
    .then(() => {
    let query = 'SELECT employee.first_name, employee.last_name, roles.title, department.name,  ';
    query += "FROM employee INNER JOIN roles ON (employee.role_id = roles.id)";

    connection.query(query, (err, res) => {
        res.forEach(( { first_name, last_name, title, salary }, i) => {
          const num = i + 1;
          console.table(
            `ID: ${num} First Name: ${first_name} Last Name: ${last_name} || Title: ${title} Salary: ${salary}`
          );
        });
        questions();
    });
    })
};

const viewAllEmployeesbyRole = () => {
    console.log("hi");
    let query = 'SELECT employee.first_name, employee.last_name, roles.title, roles.salary ';
    query += "FROM employee INNER JOIN roles ON (employee.role_id = roles.id)";

    connection.query(query, (err, res) => {
        res.forEach(( { first_name, last_name, title, salary }, i) => {
          const num = i + 1;
          console.table(
            `ID: ${num} First Name: ${first_name} Last Name: ${last_name} || Title: ${title} Salary: ${salary}`
          );
        });
        questions();
    });
};

const addDepartment = () => {
    console.log("hi");
    let query = 'SELECT employee.first_name, employee.last_name, roles.title, roles.salary ';
    query += "FROM employee INNER JOIN roles ON (employee.role_id = roles.id)";

    connection.query(query, (err, res) => {
        res.forEach(( { first_name, last_name, title, salary }, i) => {
          const num = i + 1;
          console.table(
            `ID: ${num} First Name: ${first_name} Last Name: ${last_name} || Title: ${title} Salary: ${salary}`
          );
        });
        questions();
    });
};


const addEmployee = () => {
    console.log("hi");
    let query = 'SELECT employee.first_name, employee.last_name, roles.title, roles.salary ';
    query += "FROM employee INNER JOIN roles ON (employee.role_id = roles.id)";

    connection.query(query, (err, res) => {
        res.forEach(( { first_name, last_name, title, salary }, i) => {
          const num = i + 1;
          console.table(
            `ID: ${num} First Name: ${first_name} Last Name: ${last_name} || Title: ${title} Salary: ${salary}`
          );
        });
        questions();
    });
};

const addJobTitle = () => {
    console.log("hi");
    let query = 'SELECT employee.first_name, employee.last_name, roles.title, roles.salary ';
    query += "FROM employee INNER JOIN roles ON (employee.role_id = roles.id)";

    connection.query(query, (err, res) => {
        res.forEach(( { first_name, last_name, title, salary }, i) => {
          const num = i + 1;
          console.table(
            `ID: ${num} First Name: ${first_name} Last Name: ${last_name} || Title: ${title} Salary: ${salary}`
          );
        });
        questions();
    });
};

const updateEmployeeTitle = () => {
    console.log("hi");
    let query = 'SELECT employee.first_name, employee.last_name, roles.title, roles.salary ';
    query += "FROM employee INNER JOIN roles ON (employee.role_id = roles.id)";

    connection.query(query, (err, res) => {
        res.forEach(( { first_name, last_name, title, salary }, i) => {
          const num = i + 1;
          console.table(
            `ID: ${num} First Name: ${first_name} Last Name: ${last_name} || Title: ${title} Salary: ${salary}`
          );
        });
        questions();
    });
};

connection.connect((err) => {
    if (err) throw err;
    console.log(`working with ID ` + connection.threadId);
    questions();
});