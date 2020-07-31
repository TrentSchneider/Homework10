// TODO: Write code to define and export the Employee class
const inquirer = require("inquirer");
const fs = require("fs");

class Employee {
  constructor(name, id, email, role) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.role = role;
  }
  getName() {
    const name = inquirer
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

  getRole() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "role",
          message: "What type of employee do you want to add?",
          choices: [
            "Engineer",
            "Intern",
            "Manager",
            "All employees have been added",
          ],
        },
      ])
      .then((data) => {
        switch (data.choices) {
          case "Engineer":

          case "Intern":

          case "Manager":

          case "All employees have been added":
        }
      });
  }
}
