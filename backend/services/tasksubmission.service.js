const db = require("../shared/mongo");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
const schema = require("../Schema/schema");

const tasksubmissionService = {
  async getSolutions(req, res) {
    try {
      const solutions = await db.taskSubmissions.find().toArray();
      res.send(solutions);
    } catch (err) {
      console.log(err);
      res.send({ err: "error fetching data" });
    }
  },

  async postSolutions(req, res) {
    // console.log(req.body);
    try {
      const { error, value } = await schema.postSolutionsSchema.validate({
        activity: req.body.selectedTask.activity,
        reference: req.body.selectedTask.reference,
        solution: req.body.solution,
        day: req.body.day,
      });

      //we get value if there is no error, value includes data that we passed from front end
      //console.log(value);
      if (error) {
        return res
          .status(400)
          .send({ error: "Validation falied", err: error.details[0].message });
      }

      //checking if solution already exist
      const solution = await db.taskSubmissions.findOne({
        submittedById: req.user.id,
        day: value.day,
      });

      //if it exist then we just update it
      if (solution) {
        const updatedSolution = await db.taskSubmissions.findOneAndUpdate(
          { submittedById: req.user.id, day: value.day },
          { $set: { solution: value.solution } },
          { returnDocument: "after" }
        );
        //console.log(updatedSolution);
        return res.send({ message: "solution updated", updatedSolution });
      }

      //insert new solution if it doesn't exist
      const newSolution = await db.taskSubmissions.insertOne({
        submittedByName: req.user.userName,
        submittedByEmail: req.user.email,
        submittedById: req.user.id,
        activity: value.activity,
        reference: value.reference,
        solution: value.solution,
        day: value.day,
        // grade: "",
        submittedTime: new Date().toLocaleDateString(),
      });

      res.send({
        message: "solution submitted",
        newSolution: {
          submittedByName: req.user.userName,
          submittedByEmail: req.user.email,
          submittedById: req.user.id,
          activity: value.activity,
          reference: value.reference,
          solution: value.solution,
          day: value.day,
          grade: "",
          submittedTime: new Date().toLocaleDateString(),
          id: newSolution.insertedId,
        },
      });
    } catch (err) {
      console.log(err);
      res.send({ err: "error submitting solution" });
    }
  },
  async updateGrade(req, res) {
    //console.log(req.body, req.params.id);
    try {
      const { error, value } = await schema.updateGradeSchema.validate(
        req.body
      );

      if (error) {
        return res
          .status(400)
          .send({ error: "Validation falied", err: error.details[0].message });
      }
      //console.log(value, error);

      const updatedGrade = await db.taskSubmissions.findOneAndUpdate(
        { _id: ObjectId(req.params.id) },
        { $set: { grade: value.grade } }
      );
      res.send({ message: "grade updated" });
    } catch (err) {
      console.log(err);
      res.status(400).send({ err: "error updating grade" });
    }
  },
};
module.exports = tasksubmissionService;
