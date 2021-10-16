const { MongoClient } = require("mongodb");
require("dotenv").config();

//const url = "mongodb://localhost:27017";
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

module.exports = {
  db: null,

  students: null,
  tempStudents: null,
  tasks: null,
  admin: null,
  taskSubmissions: null,

  async connect() {
    await client.connect();
    this.db = client.db("studentTask");
    this.students = this.db.collection("students");
    this.tempStudents = this.db.collection("tempStudents");
    this.tasks = this.db.collection("tasks");
    this.admin = this.db.collection("admin");
    this.taskSubmissions = this.db.collection("taskSubmissions");
  },
};
