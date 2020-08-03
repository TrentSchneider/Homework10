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
// function to run prompts and create html page
function empPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "addNew",
        message: "What would you like to do?",
        choices: ["Add new employee", "Finish entry and create html file"],
      },
      {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: ["Engineer", "Intern", "Manager"],
        when: (answers) => answers.addNew === "Add new employee",
      },
      {
        type: "input",
        name: "name",
        message: "What is the employee's name?",
        when: (answers) => answers.addNew === "Add new employee",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please make sure a name is entered.";
        },
      },
      {
        type: "input",
        name: "email",
        message: "What is the employee's email?",
        when: (answers) => answers.addNew === "Add new employee",
        validate: (answer) => {
          // regex obtained from http://zparacha.com/validate-email-address-using-javascript-regular-expression
          if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(answer)) {
            return true;
          }
          return "Please make sure a valid email address is entered.";
        },
      },
      {
        type: "input",
        name: "id",
        message: "What is the employee's ID?",
        when: (answers) => answers.addNew === "Add new employee",
        validate: (answer) => {
          if (isNaN(answer) || answer === "") {
            return "Please enter valid ID number.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "gitHub",
        message: "What is the employee's GitHub username?",
        when: (data) => data.role === "Engineer",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please make sure a GitHub username is entered.";
        },
      },
      {
        type: "input",
        name: "school",
        message: "What is the employee's school?",
        when: (data) => data.role === "Intern",
        validate: (answer) => {
          if (answer !== "") {
            return true;
          }
          return "Please make sure a school name is entered.";
        },
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is the employee's office number?",
        when: (data) => data.role === "Manager",
        validate: (answer) => {
          if (isNaN(answer) || answer === "") {
            return "Please enter valid ID number.";
          }
          return true;
        },
      },
    ])
    .then((data) => {
      // creates classes based off of prompt responses
      if (data.role === "Engineer") {
        employees.push(
          new Engineer(data.name, data.id, data.email, data.gitHub)
        );
        console.log(data.name + " has been added!");
        setTimeout(function () {
          console.clear();
          empPrompt();
        }, 3000);
      } else if (data.role === "Intern") {
        employees.push(new Intern(data.name, data.id, data.email, data.school));
        console.log(data.name + " has been added!");
        setTimeout(function () {
          console.clear();
          empPrompt();
        }, 3000);
      } else if (data.role === "Manager") {
        employees.push(
          new Manager(data.name, data.id, data.email, data.officeNumber)
        );
        console.log(data.name + " has been added!");
        setTimeout(function () {
          console.clear();
          empPrompt();
        }, 3000);
        // creates html page if the user selects "Finish entry and create html file"
      } else if (data.addNew === "Finish entry and create html file") {
        var outHtml = render(employees);
        return fs.writeFile(outputPath, outHtml, function (err) {
          if (err) throw err;
          console.log("Successfully created team.html file!");
        });
      }
    });
}
// once started, console clears and runs JS
console.clear();
empPrompt();
