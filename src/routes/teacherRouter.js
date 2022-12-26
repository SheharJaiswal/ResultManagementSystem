const teacherController = require("../controller/teacherController.js");

const express = require("express");
const teacherRouter = express.Router();

teacherRouter.get("/teacherLogin", async (req, res) => {
  if (req.session.user) {
    res.redirect("dashboard");
  } else res.render("teacherLogin");
});
teacherRouter.get("/addResult", async (req, res) => {
  if (req.session.user) {
    res.render("addResult");
  } else {
    res.render("404");
  }
});
teacherRouter.get("/register", teacherController.getRegisterPage);
teacherRouter.post("/addResult", teacherController.addStudentResult);
teacherRouter.post("/register", teacherController.registerTeacher);
teacherRouter.get("/getAllResult", teacherController.getAllResult);
teacherRouter.get("/dashboard", teacherController.teacherDashboard);
teacherRouter.post("/login", teacherController.loginTeacher);
teacherRouter.get("/logout", teacherController.logoutTeacher);
teacherRouter.get("/dashboard/delete/:id", teacherController.deleteResult);
teacherRouter.get("/dashboard/edit/:id", teacherController.getupdateResult);
teacherRouter.post("/dashboard/edit/:id", teacherController.postUpdateResult);
module.exports = teacherRouter;
