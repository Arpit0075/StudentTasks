const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../shared/mongo");
require("dotenv").config();
const mailer = require("../mailer");
const schema = require("../Schema/schema");

//console.log(process.env.JWT_SECRET);

const studentService = {
  async register(req, res) {
    try {
      //validations
      const { error, value } = await schema.registerSchema.validate(req.body);
      if (error) {
        return res
          .status(400)
          .send({ error: "Validation falied", err: error.details[0].message });
      }

      // Check Email exists
      const student = await db.students.findOne({ email: value.email });
      if (student)
        return res.status(400).send({ error: "Student already exists" });

      // Generate Salt & Hash
      const salt = await bcrypt.genSalt();
      value.password = await bcrypt.hash(value.password, salt);

      //   Insert User
      await db.students.insertOne({ ...value });

      res.send({
        message: "Student registered",
      });
    } catch (err) {
      console.log("Error Registering User - ", err);
      res.sendStatus(500);
    }
  },

  async login(req, res) {
    try {
      const { error, value } = await schema.loginSchema.validate(req.body);
      if (error) {
        return res
          .status(400)
          .send({ error: "Validation falied", err: error.details[0].message });
      }
      // Check Email exists
      const student = await db.students.findOne({ email: value.email });
      if (!student)
        return res.status(400).send({ error: "Student doesn't exists" });

      // Check Password
      const isValid = await bcrypt.compare(value.password, student.password);

      if (!isValid)
        return res.status(403).send({ error: "Email or password is wrong" });

      // Generate Token
      const authToken = jwt.sign(
        { userName: student.name, email: student.email, id: student._id },
        process.env.JWT_SECRET,
        { expiresIn: "3h" }
      );

      res.send({ authToken, studentId: student._id });
    } catch (err) {
      console.log("Error Login Student - ", err);
      res.sendStatus(500);
    }
  },

  async forgotPass(req, res) {
    try {
      // Check Email exists
      const student = await db.students.findOne({ email: req.body.email });
      if (!student)
        return res.status(400).send({ error: "User doesn't exists" });

      // Generate Token
      const authToken = jwt.sign(
        { userId: student._id, email: student.email },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      //create temp account/document for user with email and tempPassword in tempUsers collecion, storing password in the form of string
      const tempPass = String(
        Math.floor(
          Math.random() * 7545 + Math.random() * 100 + Math.random() * 27 + 957
        )
      );
      const tempStudent = await db.tempStudents.insertOne({
        email: req.body.email,
        tempPassword: tempPass,
        // expiresIn: new Date().getTime() + 900 * 1000, //it will expire in 15 minutes, converted it into milliseconds
      });

      //send email to user
      mailer(student.email, tempPass);

      res.send({
        message: "email sent please fill the password within 15 minutes",
        //tempUser: { email: req.body.email, temppassword: tempPass },
        authToken,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ err: "falied sending email" });
    }
  },

  async resetPass(req, res) {
    //console.log(req.body);
    //we will get email and password from front end
    //check if email exist
    try {
      // Check if user with same email and tempPass exists
      const tempStudent = await db.tempStudents.findOne({
        email: req.body.email,
        tempPassword: req.body.tempPassword,
      });
      if (!tempStudent) {
        res.send({ err: "failed to find such user" });
      }

      // Generate Salt & Hash
      const salt = await bcrypt.genSalt();
      req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);

      const updatedStudent = await db.students.findOneAndUpdate(
        { email: req.user.email },
        {
          $set: { password: req.body.newPassword },
        }
      );
      res.send({ message: "password reset successfull" });

      //delete tempUser in tempUsers collection
      db.tempStudents.deleteOne({
        email: req.body.email,
        tempPassword: req.body.tempPassword,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ err: err });
    }
  },
};

module.exports = studentService;
