const db = require("../shared/mongo");
require("dotenv").config();
const schema = require("../Schema/schema");

const taskService = {
  async getTasks(req, res) {
    try {
      const tasks = await db.tasks.find().toArray();
      //console.log(tasks);
      res.send(tasks);
    } catch (err) {
      console.log(err);
      res.status(400).send({ err: "error fetching data" });
    }
  },
  async postTask(req, res) {
    try {
      const { error, value } = await schema.postTaskSchema.validate(req.body);
      if (error) {
        return res
          .status(400)
          .send({ error: "Validation falied", err: error.details[0].message });
      }

      const newTask = await db.tasks.insertOne({
        ...value,
        date: new Date().toLocaleString(),
      });
      res.send({
        ...value,
        id: newTask.insetedId,
        date: new Date().toLocaleString(),
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({ err: "error posting task" });
    }
  },
};

module.exports = taskService;
