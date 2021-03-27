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
    let query = 'SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, employee.manager_id, departments.department_name,'
    query += 'CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM roles INNER JOIN employee ON employee.role_id = roles.id LEFT JOIN employee manager ON manager.id = employee.manager_id INNER JOIN departments ON roles.department_id = departments.id;'
    
    connection.query(query, (err, res) => {
        const peopleArray = []
        res.forEach(( { id, first_name, last_name, title, salary, manager, department_name, }, ) => {
          const peopleObject = {
            "ID ": id, 
            "First Name":  first_name, 
            "Last Name": last_name,
            "Title": title,
            "Salary": salary,
            "Manager": manager,
            "Department": department_name,
            
          }
          peopleArray.push(peopleObject);
        });
        console.table(peopleArray);
        questions();
    });
};

const viewAllEmployeesbyDepartment = () => {
    let query = 'SELECT employee.id, employee.first_name, employee.last_name, roles.title'
                query += 'FROM roles INNER JOIN employee ON employee.role_id = roles.id RIGHT JOIN departments ON departments.id = roles.department_id'
                query+= 'WHERE department_name = ?'
        inquirer 
        .prompt({
            name: 'department',
            type: "list",
            message: "Which Department?",
            choices: ["Sales", "Engineering", "Finance", "Legal"]
    })
    .then((answer) => {
        // switch(answer.department) {
        //     case "Sales": 
        connection.query(query, {department_name: answer.department}, (err, res) => {
            const peopleArray = []
            res.forEach(( { id, first_name, last_name, title, }, ) => {
              const peopleObject = {
                "ID ": id, 
                "First Name":  first_name, 
                "Last Name": last_name,
                "Title": title,
              }
              peopleArray.push(peopleObject);
            });
            console.table(peopleArray);
            questions();
        });
    //             break;
    //         case "Engineering":

    //             break;
    //         case "Finance":

    //             break;
    //         case "Legal":

    //             break;
    //         default:
    //             console.log("try again");
    //             break;
    //     }
    // })
        // let query = 'SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, employee.manager_id, departments.department_name,'
        // query += 'CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM roles INNER JOIN employee ON employee.role_id = roles.id LEFT JOIN employee manager ON manager.id = employee.manager_id INNER JOIN departments ON roles.department_id = departments.id;'
        
        // connection.query(query, (err, res) => {
        //     const peopleArray = []
        //     res.forEach(( { id, first_name, last_name, title, salary, manager, department_name, }, ) => {
        //       const peopleObject = {
        //         "ID ": id, 
        //         "First Name":  first_name, 
        //         "Last Name": last_name,
        //         "Title": title,
        //         "Salary": salary,
        //         "Manager": manager,
        //         "Department": department_name,
                
        //       }
        //       peopleArray.push(peopleObject);
        //     });
            // console.table(peopleArray);
            // questions();
        // });
    });
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