const express = require("express");
const { createProject } = require("../controllers/project.controller");
const router = express.Router();

router.post("/createProject", createProject);
module.exports = router;
