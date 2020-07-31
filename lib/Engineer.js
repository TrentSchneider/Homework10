// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(github) {
    this.github = github;
    this.role = "Engineer";

    super(name, id, email);
    this.name = name;
    this.id = id;
    this.email = email;
  }

  getGithub() {
    return this.github;
  }

  getRole() {
    return this.role;
  }
}
module.exports = Employee;
