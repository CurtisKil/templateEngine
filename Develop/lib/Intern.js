// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
// You must bring in/ require the employee class
const Employee =require("./Employee")

class Intern extends Employee {
    constructor (name, id, email, school) {
        // Super accesses the parent class
        super(name, id, email);
        this.school = school;
    }

    // Here you create a getRole() method
    getRole() {
        return "Intern"
    }

    getSchool() {
        return this.school
    }
}

module.exports = Intern;