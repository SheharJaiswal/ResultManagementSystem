const express = require("express");
const resultRouter = express.Router();
const resultController = require("../controller/resultController");

resultRouter.get("", async (req, res) => {
  res.render("studentLogin");
});
resultRouter.post("/login", resultController.loginStudent);
resultRouter.get("/studentDashboard", resultController.studentDashboard);
module.exports = resultRouter;
