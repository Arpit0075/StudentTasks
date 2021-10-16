const router = require("express").Router();
const service = require("../services/students.service");

router.get("/", service.getStudents);

module.exports = router;
