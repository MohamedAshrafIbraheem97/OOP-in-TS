/**
 * person
 * student extend person
 * teacher extend person
 * course is teacher by teacher
 * course is learned by student
 */

const enum grade {
  grade7,
  grade8,
  grade9,
  grade10,
  grade11,
  grade12,
}

abstract class User {
  private _id;

  constructor(
    public name: string,
    public age: number,
    private username: string,
    private password: string
  ) {
    this._id = this.idGenrator();
  }

  private idGenrator(): number {
    return Date.now();
  }

  protected get id() {
    return this._id;
  }

  protected getUserType(): void {
    console.log("I'm a person");
  }

  public register() {}

  public login() {}

  public updateInfo() {}
}

class Admin extends User {
  coursesList: Course[] = [];

  constructor(name: string, age: number, username: string, password: string) {
    super(name, age, username, password);
  }

  createCourse(newCourse: Course) {
    this.coursesList.push(newCourse);
    return this.coursesList;
  }

  getUserType(): void {
    console.log("I'm an Admin!");
  }
}

class Student extends User {
  courses: Course[];

  constructor(
    name: string,
    age: number,
    username: string,
    password: string,
    private _grade: grade
  ) {
    super(name, age, username, password);

    this.grade = this._grade;
    this.courses = [];
  }

  buyCourse(course: Course) {}

  private set grade(v: grade) {
    if (v > grade.grade7 && v <= grade.grade12) {
      this._grade = v;
    } else {
      this.grade = grade.grade7;
    }
  }

  getUserType(): void {
    console.log("I'm a student!");
  }
}

class Teacher extends User {
  courses: Course[] = [];

  constructor(
    name: string,
    age: number,
    username: string,
    password: string,
    public credentials: string = "teacher"
  ) {
    super(name, age, username, password);
  }

  getUserType(): void {
    console.log("I'm a teacher!");
  }

  teachCourse(course: Course) {
    this.courses.push(course);
  }
}

class Course {
  private _code: string;
  public coursesList: Course[] = [];
  private enrollments: Student[] = [];

  constructor(public name: string, public grade: grade) {
    this._code = this.generateCode();
  }

  public get code(): string {
    return this._code;
  }

  generateCode() {
    return "course" + Date.now();
  }

  enrollToCourse(student: Student) {
    this.enrollments.push(student);
  }

  getEnrollments() {
    return this.enrollments;
  }
}

const admin = new Admin("ahmed", 20, "ahmed", "123");
const coursesList = admin.createCourse(new Course("cs101", grade.grade7));

const ahmed = new Student("ahmed", 20, "ahmed", "123", grade.grade7);
