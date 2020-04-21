// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
// First you have to require Employee module
const Employee = require("./Employee");

// class Manager is a child class
class Manager extends Employee {
    constructor (name, id, email, officeNumber){

        super(name, id, email);
        this.officeNumber = officeNumber;
    }


    getRole() {
        return "Manager"
    }

    getOfficeNumber() {
        return this.officeNumber
    }

}

module.exports = Manager;