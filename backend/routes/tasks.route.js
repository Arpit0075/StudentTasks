const router = require("express").Router();
const taskService = require("../services/task.service");

router.get("/", taskService.getTasks);
router.post("/", taskService.postTask);

module.exports = router;
