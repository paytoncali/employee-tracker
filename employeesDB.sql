DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role (id),
    FOREIGN KEY (id) REFERENCES employee (manager_id),
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DEC(10) NOT NULL, 
    department_id INT NOT NULL,
    PRIMARY KEY (id)

);

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
    FOREIGN KEY (department_id) REFERENCES department(id),

);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Payton", "Whinnery", 7, 2), ("Rachel", "Amos", 4, 3), ("Caroline", "Miller", 3, 1), ("Jackie", "Hodges", 2, 2), ("Molly", "Gilbert", 1, NULL), ("Walter", "Perry", 5, NULL), ("Natalie", "Guidry", 6, NULL), ("Nina", "Whinnery", 7, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 130000, 1), ("Salesperson", 100000, 1), ("Lead Engineer", 150000, 2), ("Software Engineer", 150000, 2), ("Accountant", 120000, 3), ("Legal Team Lead", 150000, 4), ("Lawyer", 160000, 4);

INSERT INTO departments (department_name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");


