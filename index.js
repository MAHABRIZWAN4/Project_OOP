import inquirer from "inquirer";
import chalk from "chalk";
import gradient from "gradient-string";
const gradientText = gradient([
    "red",
    "yellow",
    "red",
    "yellow",
    "green",
    "yellow",
    "red",
    "yellow",
    "red",
    "yellow",
]);
const gradientText1 = gradient([
    "red",
    "yellow",
    "red",
    "yellow",
    "red",
    "yellow",
    "red",
    "yellow",
]);
class Student {
    name;
    constructor(n) {
        this.name = n;
    }
}
class Person {
    students = [];
    // Use method to push students.
    AddStudents(obj) {
        this.students.push(obj);
    }
}
// Initiate person Array:
let persons = new Person();
// Make Function:
const programStart = async (persons) => {
    do {
        console.log(chalk.yellow.bold("\t\t***********"));
        console.log(chalk.yellow.bold("\t\t**") + gradientText1("WELCOME") + chalk.yellow.bold("**"));
        console.log(chalk.yellow.bold("\t\t***********"));
        let ans = await inquirer.prompt({
            name: "select",
            type: "list",
            message: chalk.bgBlueBright.bold.italic("Whom would you like to interact with?"),
            choices: ["Staff", "Student", "Exit"]
        });
        if (ans.select === "Staff") {
            console.log(gradientText.multiline("You Aproach the Staff Room.Please feel free to ask any question."));
        }
        else if (ans.select === "Student") {
            let ans = await inquirer.prompt({
                name: "student",
                type: "input",
                message: chalk.bgGreenBright.bold.italic("\nEnter the Students name you wish to engage with:"),
            });
            const studentName = ans.student.trim(); // Trim to remove extra spaces
            // Highlighted change: Check for empty or undefined name
            if (!studentName) {
                console.log(chalk.bgRedBright.bold("\nPlease enter a valid student name.\n"));
                continue; // Continue the loop to ask again
            }
            const student = persons.students.find(val => val.name === ans.student);
            // Condition if student include in array
            if (!student) {
                const name = new Student(ans.student);
                persons.AddStudents(name);
                console.log(chalk.bold.italic.bgCyanBright(`\nHello ${name.name} Nice to meet you.`));
                console.log(chalk.bold.italic.bgMagentaBright("\nNew Student Added"));
                console.log(chalk.bold.italic.bgGreenBright.underline("\nCurrent Student List:\n"));
                console.log((persons.students));
            }
            // Condition if student include in array
            else {
                console.log(chalk.bold.italic.bgCyanBright(`\nHello ${student.name} Nice to see you again.`));
                console.log(chalk.bold.italic.bgMagentaBright.underline("\nExisting Student List\n"));
                console.log(persons.students);
            }
        }
        else if (ans.select === "Exit") {
            console.log(gradientText("\n******************Exiting The Program******************"));
            process.exit();
        }
    } while (true);
};
programStart(persons);
