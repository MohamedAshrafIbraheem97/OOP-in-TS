"use strict";
/**
 * person
 * student extend person
 * teacher extend person
 * course is teacher by teacher
 * course is learned by student
 */
class User {
    constructor(name, age, username, password) {
        this.name = name;
        this.age = age;
        this.username = username;
        this.password = password;
        this._id = this.idGenrator();
    }
    idGenrator() {
        return Date.now();
    }
    get id() {
        return this._id;
    }
    getUserType() {
        console.log("I'm a person");
    }
    register() { }
    login() { }
    updateInfo() { }
}
class Admin extends User {
    constructor(name, age, username, password) {
        super(name, age, username, password);
        this.coursesList = [];
    }
    createCourse(newCourse) {
        this.coursesList.push(newCourse);
        return this.coursesList;
    }
    getUserType() {
        console.log("I'm an Admin!");
    }
}
class Student extends User {
    constructor(name, age, username, password, _grade) {
        super(name, age, username, password);
        this._grade = _grade;
        this.grade = this._grade;
        this.courses = [];
    }
    buyCourse(course) { }
    set grade(v) {
        if (v > 0 /* grade.grade7 */ && v <= 5 /* grade.grade12 */) {
            this._grade = v;
        }
        else {
            this.grade = 0 /* grade.grade7 */;
        }
    }
    getUserType() {
        console.log("I'm a student!");
    }
}
class Teacher extends User {
    constructor(name, age, username, password, credentials = "teacher") {
        super(name, age, username, password);
        this.credentials = credentials;
        this.courses = [];
    }
    getUserType() {
        console.log("I'm a teacher!");
    }
    teachCourse(course) {
        this.courses.push(course);
    }
}
class Course {
    constructor(name, grade) {
        this.name = name;
        this.grade = grade;
        this.coursesList = [];
        this.enrollments = [];
        this._code = this.generateCode();
    }
    get code() {
        return this._code;
    }
    generateCode() {
        return "course" + Date.now();
    }
    enrollToCourse(student) {
        this.enrollments.push(student);
    }
    getEnrollments() {
        return this.enrollments;
    }
}
const admin = new Admin("ahmed", 20, "ahmed", "123");
const coursesList = admin.createCourse(new Course("cs101", 0 /* grade.grade7 */));
const ahmed = new Student("ahmed", 20, "ahmed", "123", 0 /* grade.grade7 */);
