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
        choices: ["View All Employees", "View All Employees by Department", "View All Employees by Role", "Add Department", "Add Employee", "Add Job Title", "Update Employee Title", "Exit",]
        }
    ])
    .then((answer) => {
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
            case "Update Employee Title":
                updateEmployeeTitle();
                break;
            case "Exit":
                connection.end();
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
    let query = 'SELECT employee.id, employee.first_name, employee.last_name, roles.title '
                query += 'FROM roles INNER JOIN employee ON employee.role_id = roles.id RIGHT JOIN departments ON departments.id = roles.department_id '
                query += 'WHERE ?'
        inquirer 
        .prompt({
            name: 'department',
            type: "list",
            message: "Which Department?",
            choices: ["Sales", "Engineering", "Finance", "Legal"]
    })
    .then((answer) => {
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
    });
};

const viewAllEmployeesbyRole = () => {
    let query = 'SELECT employee.id, employee.first_name, employee.last_name, roles.salary '
                query += 'FROM roles INNER JOIN employee ON employee.role_id = roles.id RIGHT JOIN departments ON departments.id = roles.department_id '
                query += 'WHERE ?'
        inquirer 
        .prompt({
            name: 'role',
            type: "list",
            message: "Which Role?",
            choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Accountant", "Legal Team Lead", "Lawyer"]
    })
    .then((answer) => {
        connection.query(query, {title: answer.role}, (err, res) => {
            const peopleArray = []
            res.forEach(( { id, first_name, last_name, salary, }, ) => {
              const peopleObject = {
                "ID ": id, 
                "First Name":  first_name, 
                "Last Name": last_name,
                "Salary": salary,
              }
              peopleArray.push(peopleObject);
            });
            console.table(peopleArray);
            questions();
        });
    });
};

const addDepartment = () => {
    inquirer
    .prompt({
        name: 'department',
        type: "input",
        message: "What department would you like to add?",
    })
    .then((answer) => {
        connection.query(
        'INSERT INTO departments SET ?',
        {
            department_name: answer.department
        },
        (err) => {
            if (err) throw err;
            console.log("Your Department has been added!");
            questions();
        });
    });
};


const addEmployee = () => {
    connection.query('SELECT * FROM roles', (err, res) => {
        inquirer
        .prompt([
            {
            name: 'firstName',
            type: "input",
            message: "What is the Employee's First Name?",
        },
        {
            name: 'lastName',
            type: "input",
            message: "What is the Employee's Last Name?",
        },
        {
            name: "roleid",
            type: "list",
            message: "Please choose a role for the Employee from the following:",
            choices() {
                const roleArray = [];
                for (let i=0; i<res.length; i++){
                    roleArray.push(`${i+1} ${res[i].title}`);
                } 
                return roleArray;
            },
        }
        ])
        .then((answer) => {
            connection.query(
            'INSERT INTO employee SET ?',
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleid.split('')[0]
            },
            (err) => {
                if (err) throw err;
                console.log("Your Employee has been added!");
                questions();
            });
    });  
})};

const addJobTitle = () => {
    connection.query('SELECT * FROM departments', (err, res) => {
    inquirer
    .prompt([
        {
        name: 'role',
        type: "input",
        message: "What Job Title would you like to add?",
    },
    {
        name: 'salary',
        type: "input",
        message: "What is the Salary for this Job Title?",
    },
    {
        name: "jobid",
        type: "list",
        message: "Please choose a department from the following:",
        choices() {
            const departmentArray = [];
            for (let i=0; i<res.length; i++){
                departmentArray.push(`${i+1} ${res[i].department_name}`);
            } 
            return departmentArray;
        },
    }
    ])
    .then((answer) => {
        connection.query(
        'INSERT INTO roles SET ?',
        {
            title: answer.role,
            salary: answer.salary,
            department_id: answer.jobid.split('')[0]
        },
        (err) => {
            if (err) throw err;
            console.log("Your Job Title has been added!");
            questions();
        });
    });  
})};

const updateEmployeeTitle = () => {
    connection.query('SELECT CONCAT(first_name, " ", last_name) AS employee_name FROM employee ', (err, res) => {
        inquirer
        .prompt([
            {
            name: 'name',
            type: "list",
            message: "What is the employee's name that needs the job title change?",
            choices() {
                const employeeArray = [];
                res.forEach(({ employee_name }) => {
                    employeeArray.push(employee_name);
                })
                return employeeArray;
            },
        },
        {
            name: 'role',
            type: "list",
            message: "What is their new Job Title?",
                choices() {
                    const roleArray = [];
                    forEach(({ role_id }) => {
                        roleArray.push( role_id );
                    })
                return roleArray;
            },
        }
        ])
        .then((answer) => {
            connection.query(
            'UPDATE employee SET ? WHERE ?',
            {
                employee_name: answer.name,
                role_id: answer.role
            },
            (err) => {
                if (err) throw err;
                console.log("Your Job Title has been added!");
                questions();
            }
        )});    
})};


connection.connect((err) => {
    if (err) throw err;
    console.log(`working with ID ` + connection.threadId);
    questions();
});