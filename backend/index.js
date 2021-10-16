const express = require("express");
const app = express();
const mongo = require("./shared/mongo");
const cors = require("cors");
const studentService = require("./services/users.service");
const adminService = require("./services/admin.service");
const { authCheck } = require("./shared/middleware");
const tasksRoutes = require("./routes/tasks.route");
const taskSubmissionRoutes = require("./routes/tasksubmission.route");
const studentsRoutes = require("./routes/students.route");
require("dotenv").config();
const port = process.env.PORT || 3001;

async function loadApp() {
  try {
    await mongo.connect();

    app.use(cors());

    app.use(express.json());

    app.get("/", (req, res) => {
      res.send("Welcome!!");
    });

    //route for forgotpassword
    app.post("/forgotPass", studentService.forgotPass);

    //routes for login/register
    app.post("/register", studentService.register);
    app.post("/login", studentService.login);

    //route for admin login
    app.post("/adminLogin", adminService.login);

    //middlewares
    app.use(authCheck);

    //private routes

    //get students data for mentors
    app.use("/students", studentsRoutes);

    app.put("/resetPass", studentService.resetPass);

    app.use("/tasks", tasksRoutes);
    app.use("/taskSubmissions", taskSubmissionRoutes);

    app.listen(port);
  } catch (err) {
    console.log(err);
  }
}
loadApp();
