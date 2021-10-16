const db = require("../shared/mongo");
require("dotenv").config();

const service = {
  async getStudents(req, res) {
    try {
      const students = await db.students.find().toArray();
      res.send(students);
    } catch (err) {
      console.log(err);
      res.send({ err: "error fetching students" });
    }
  },
};

module.exports = service;
