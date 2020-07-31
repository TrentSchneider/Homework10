// TODO: Write code to define and export the Employee class
const inquirer = require("inquirer");

class Employee {
  constructor(name, id, email, role) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.role = role;
  }
  getName() {
    let name = inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the employee's name?",
        },
      ])
      .then((data) => {
        return data.name;
      });
  }

  getId() {
    inquirer
      .prompt([
        { type: "input", name: "id", message: "What is the employee's ID?" },
      ])
      .then((data) => {
        return data.id;
      });
  }

  getEmail() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "email",
          message: "What is the employee's ID?",
        },
      ])
      .then((data) => {
        return data.email;
      });
  }

  //   getRole() {
  //     return }
}
const employee = new Employee();
employee.getName();
console.log(employee.name);
