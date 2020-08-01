const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

function empPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: [
          "Engineer",
          "Intern",
          "Manager",
          "All employees have been added",
        ],
      },
      {
        type: "input",
        name: "name",
        message: "What is the employee's name?",
        when: (answers) => answers.role !== "All employees have been added",
      },
      {
        type: "input",
        name: "email",
        message: "What is the employee's email?",
        when: (answers) => answers.role !== "All employees have been added",
      },
      {
        type: "input",
        name: "id",
        message: "What is the employee's ID?",
        when: (answers) => answers.role !== "All employees have been added",
      },
      {
        type: "input",
        name: "gitHub",
        message: "What is the employee's GitHub username?",
        when: (data) => data.role === "Engineer",
      },
      {
        type: "input",
        name: "school",
        message: "What is the employee's school?",
        when: (data) => data.role === "Intern",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is the employee's office number?",
        when: (data) => data.role === "Manager",
      },
    ])
    .then((data) => {
      if (data.role === "Engineer") {
        employees.push(
          new Engineer(data.name, data.id, data.email, data.gitHub)
        );
        empPrompt();
      } else if (data.role === "Intern") {
        employees.push(new Intern(data.name, data.id, data.email, data.school));
        empPrompt();
      } else if (data.role === "Manager") {
        employees.push(
          new Manager(data.name, data.id, data.email, data.officeNumber)
        );
        empPrompt();
      } else if (data.role === "All employees have been added") {
        var outHtml = render(employees);
        return fs.writeFile(outputPath, outHtml, function (err) {
          if (err) throw err;
          console.log("Successfully wrote to team.html file");
        });
      }
    });
}
empPrompt();
