const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Create team members array that we will add to as new employees are created from inquire.prompt
const teamMembers = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function createManager() {
   inquirer.prompt([
     

    {
      type: "input",
      name: "managerName",
      message: "Who is the team manager?"
    },

    {
      type: "input",
      name: "managerId",
      message: "What is the team manager's id number?"
    },

    {
      type: "input",
      name: "managerEmail",
      message: "What is the team manager's email?"
    },

    {
      type: "input",
      name: "officeNumber",
      message: "What is the manager's office number?"
    }
  ])

  // Answers is the object that is returned when the user answers all the prompts
  .then(answers => {
    console.info('Answer:', answers);
    // This is making a new instance or creating (instantiating) the manager object
    var manager = new Manager (answers.managerName, answers.managerId, answers.managerEmail, answers.officeNumber)
    // Adding manager to the teamMembers array
    teamMembers.push(manager);
    promptNewMember();
  });
  // Here add a .then to get the answers from the user you will use these answers to create a new object
  // based on the classes that we have made. After you create an object you have to push it to the team members array
  // Go to inquire documentation for help
}


function promptNewMember() {
  inquirer.prompt([
    {
      type: "list",
      name: "newMember",
      choices: ["Engineer", "Intern", "No more I'm gucci"],
      message: "Do you want to add a new team member?"
    }
  ])
  .then(answers => {
    // A cleanier option is to store the answer and in order to do that you have to create a variable
    // I could of just done "answers.newMember"
    const userChoice = answers.newMember
    // We're checking to see if we want to continue or stop based off the prompt answer
    switch(userChoice){
      case "Engineer":
        // code that gets executed if the case is Engineer
        promptEngineer();
        // Stops the continuation of the code if Engineer is picked
        break;
      case "Intern":
        promptIntern();
        break;
        // If nothing else is chosen it defaults
      default:
        // Todo: Call function that renders template with all the employees in the team member array
        console.log('afgkfg');
        renderTeam();
    }
  });
}

function promptEngineer() {
   inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?"
    },

    {
      type: "input",
      name: "id",
      message: "What is your id number?"
    },

    {
      type: "input",
      name: "email",
      message: "What is your email?"
    },


    {
      type: "input",
      name: "github",
      message: "What is your GitHub?"
    },

  ])

  // Creating a new object with the answers from prompt
  .then(answers => {
    console.info('Answer:', answers);
    // This is making a new instance or creating (instantiating) the engineer object
    var engineer = new Engineer (answers.name, answers.id, answers.email, answers.github)
    // Adding enigeer to the teamMembers array
    teamMembers.push(engineer);
    promptNewMember();
  });
}

function promptIntern() {
  inquirer.prompt([
   {
     type: "input",
     name: "name",
     message: "What is your name?"
   },

   {
     type: "input",
     name: "id",
     message: "What is your id number?"
   },

   {
     type: "input",
     name: "email",
     message: "What is your email?"
   },


   {
     type: "input",
     name: "school",
     message: "What is your school?"
   },

 ])

 .then(answers => {
  console.info('Answer:', answers);
  // This is making a new instance or creating (instantiating) the intern object
  var intern = new Intern (answers.name, answers.id, answers.email, answers.school)
  // Adding intern to the teamMembers array
  teamMembers.push(intern);
  // Asking if you want to add another user
  promptNewMember()
});

}

function renderTeam() {
  // This passes in the team members to the render function in renderhtml
  // THis is a function that returns a string based off of the employees chosen
  const teamMembersString = render(teamMembers)
  fs.writeFile('./teamMembers.html', teamMembersString, function (err) {
    if (err) return console.log(err);
    console.log("anything");
  });

}


createManager();








// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
