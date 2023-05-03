const cTable = require("console.table"); 
const mysql = require("mysql2"); 
const inquirer = require("inquirer"); 
const express = require("express"); 
const util = require("util"); 

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  
  {
    host: "localhost",
    user: "root",
    password: "CheeseBalls4!5",
    database: "employee_db",
  },
  console.table('EMPLOYEE MANAGER'),
  console.log(`Connected to the employee_db database.`)
);
db.connect(); 
db.query = util.promisify(db.query); 
openApp(); 

async function openApp() {
 
   inquirer.prompt(
    
    {
      type: "list",
      message: "Select an option",
      choices: [
        "View departments",
        "View roles",
        "View employees",
        "Add department",
        "Add role",
        "Add employee",
        "Update employee role",
        "Exit"],
        name: "option",
    },
  ).then(function(answer){

    switch (
    answer.option) {
    case "View departments":
      selectDepartment();
      break;
    case "View roles":
      selectRole();
      break;
    case "View employees":
      selectEmployees();
      break;
    case "Add department":
      addDepartment();
      break;
    case "Add role":
      addRole();
      break;
    case "Add employee":
      addEmployee();
      break;
    case "Update employee role":
      updateEmployee();
      break;
    case "Exit":
      exit();
      break;
    }
  })
};
async function selectEmployees() {
  
  const employee = await db.query(`
    SELECT employee.*, role.title, role.salary
    FROM employee
    JOIN role ON employee.role_id = role.id
  `);
  console.table(employee);
  openApp();
}

async function addEmployee() {
 
  let answer = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the employee's first name?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the employee's last name?",
    },
    {
      type: "input",
      name: "role_id",
      message:
        "Please select the role for the employee: 1 for Manager, 2 for office, 3 for warehouse.",
    },
    {
      type: "input",
      name: "manager_id",
      message:
        "Which manager do they report to? 1 for Branch, 2 for Operations.",
    },
  ]);
  await db.query(
    "INSERT INTO employee SET first_name=?, last_name=?, role_id=?, manager_id=?",
    [answer.first_name, answer.last_name, answer.role_id, answer.manager_id]
  );
  console.table("Employee added.");
  openApp();
}
async function updateEmployee() {
 
  let answer = await inquirer.prompt([
    {
      type: "list",
      name: "employee_id",
      message: "Please choose the following employee from the list:",
      choices: async () => {
        const employees = await db.query("SELECT * FROM employee");
        const addEmployee = employees.map((employee) => {
          return {
            name: employee.first_name + " " + employee.last_name,
            value: employee.id,
          };
        });
        return addEmployee;
      },
    },
    {
      type: "list",
      name: "role_id",
      message: "Please choose the new role for the employee:",
      choices: async () => {
        const roles = await db.query("SELECT * FROM role");
        const newRoles = roles.map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        });
        return newRoles;
      },
    },
  ]);

  await db.query(
    "UPDATE employee SET role_id=? WHERE id=?",
    [answer.role_id, answer.employee_id],
    (err, results) => {
      if (err) throw err;
      openApp();
      console.log("Employee updated");
    }
  );
  openApp();
}

async function selectRole() {
  const role = await db.query("SELECT * FROM role");
  console.table(role);
  openApp();
}

async function addRole() {
  let answer = await inquirer.prompt([
    {
      type: "input",
      name: "role_title",
      message: "What is the title of the new role?",
    },
    {
      type: "input",
      name: "role_salary",
      message: "What is the salary for this role?",
    },
    {
      type: "input",
      name: "department_id",
      message: "Which department does this role belong to?",
    },
  ]);
  await db.query("INSERT INTO role SET title=?, salary=?, department_id=?", [
    answer.role_title,
    answer.role_salary,
    answer.department_id,
  ]);
  console.table("New role added");
  openApp();
}

async function selectDepartment() {
  const department = await db.query("SELECT * FROM department");
  console.table(department);
  openApp();
}

async function addDepartment() {
  let answer = await inquirer.prompt([
    {
      type: "input",
      name: "department_name",
      message: "What is the name of the new department",
    },
  ]);
  await db.query("INSERT INTO department SET name=?", answer.department_name);
  const addDepartment = await db.query("SELECT * FROM department");
  console.table(addDepartment);
  openApp();
}