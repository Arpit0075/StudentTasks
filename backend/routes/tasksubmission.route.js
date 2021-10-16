const router = require("express").Router();
const tasksubmissionService = require("../services/tasksubmission.service");

router.get("/", tasksubmissionService.getSolutions);
router.post("/", tasksubmissionService.postSolutions);
router.put("/:id", tasksubmissionService.updateGrade);

module.exports = router;
