import inquirer from 'inquirer';
//define a student class
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }
    //Method to enroll  student in a course
    enrollCourse(course) {
        this.courses.push(course);
    }
    //View balance
    view_balance() {
        console.log(`Balance for ${this.id} is ${this.balance}`);
    }
    //pay my fee
    pay_fee(amount) {
        this.balance -= amount;
        console.log(`$${amount} Fee paid successfully ${this.name}`);
    }
    //display student status
    display_status() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses.join(',')}`);
        console.log(`Balance: ${this.balance}`);
    }
} // class end
//student sec class
class Student_Manager {
    students;
    constructor() {
        this.students = [];
    }
    //method to add  a new student
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfully. Student ID: ${student.id}`);
    }
    //method to enroll student
    enroll_student(student_id, course) {
        let student_found = this.students.find(str => str.id === student_id);
        if (student_found) {
            student_found.enrollCourse(course);
            console.log(`${student_found.name} enrolled in ${course} successfully!`);
        } // if end
    } // enroll student end
    View_balance(student_id) {
        let student_found = this.students.find(str => str.id === student_id);
        if (student_found) {
            student_found.view_balance();
        }
        else {
            console.log('student is not found');
        }
    } // view balance
    // pay school fee
    pay_fee(student_id, amount) {
        let student_found = this.students.find(str => str.id === student_id);
        if (student_found) {
            student_found.pay_fee(amount);
        }
        else {
            console.log('student not found');
        }
    }
    //display student status
    show_student_status(student_id) {
        let student_found = this.students.find(str => str.id === student_id);
        if (student_found) {
            student_found.display_status();
        }
        else {
            console.log('student is not found');
        }
    }
} //class end
// main function to run the program
async function main() {
    console.log('Wellcome to student managment system');
    console.log("-".repeat(50));
    let student_manager = new Student_Manager();
    //keep going on
    while (true) {
        let choice = await inquirer.prompt({
            type: "list",
            name: 'choice',
            message: "Select one option",
            choices: [
                "Add student",
                "Enroll Student",
                "View StudentBalance",
                "pay fee",
                "show  status",
                "Exit"
            ]
        });
        //use switch statment
        switch (choice.choice) {
            case "Add student":
                let name_input = await inquirer.prompt({
                    name: "name",
                    type: "input",
                    message: "Enter your name"
                });
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: 'number',
                        message: "Enter your id"
                    },
                    {
                        name: "course",
                        type: 'input',
                        message: "Enter your course",
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View StudentBalance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: 'number',
                        message: "Enter your id",
                    }
                ]);
                student_manager.View_balance(balance_input.student_id);
                break;
            case "pay fee":
                let fee_input = await inquirer.prompt([
                    {
                        name: 'student_id',
                        type: "number",
                        message: "Enter your id",
                    },
                    {
                        name: 'amount',
                        type: "number",
                        message: "Enter your amount"
                    }
                ]);
                student_manager.pay_fee(fee_input.student_id, fee_input.amount);
                break;
            case "show  status":
                let show_input = await inquirer.prompt({
                    name: "student_id",
                    type: 'number',
                    message: "enter your id"
                });
                student_manager.show_student_status(show_input.student_id);
                break;
            case "Exit":
                console.log('Exiting...');
                process.exit();
        } //switch
    } // while loop
} // main function
//calling my funcation
main();
