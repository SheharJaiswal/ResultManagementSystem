const { localsName } = require("ejs");
const db = require("../models");
const Teacher = db.teachers;
const Result = db.results;
const bcrypt = require("bcrypt");

const registerTeacher = async (req, res) => {
  await bcrypt.hash(req.body.password, 10).then((hash) => {
    console.log(hash);
    var info = {
      teacherName: req.body.teacherName,
      teacherUsername: req.body.teacherUsername,
      password: hash,
    };
    Teacher.create(info);
  });
  res.redirect("/");
};
const getAllResult = async (req, res) => {
  const results = await Result.findAll();
  res.status(200).send(results);
};

const getRegisterPage = async (req, res) => {
  res.render("registerTeacher");
};

const loginTeacher = async (req, res) => {
  const teacher = await Teacher.findOne({
    where: { teacherUsername: req.body.username },
  });

  if (teacher) {
    const password_valid = await bcrypt.compare(
      req.body.password,
      teacher.password
    );
    if (password_valid) {
      req.session.user = teacher.teacherName;
      res.redirect("dashboard");
      // res.end("Login Successful...");
    } else {
      res.render("teacherLogin", {
        unauthorizedTeacher: "Invalid Username or Password!",
      });
    }
  } else {
    res.render("teacherLogin", {
      unauthorizedTeacher: "Invalid Username or Password!",
    });
  }
};
const addStudentResult = async (req, res) => {
  try {
    if (req.session.user) {
      let detailResult = {
        studentName: req.body.studentName,
        rollNo: req.body.rollNo,
        score: req.body.score,
        dob: req.body.dob,
        supervisor: req.session.user,
        maximumMarks: req.body.maxMarks,
      };
      const result = await Result.create(detailResult);
      res.redirect("/api/teacher/dashboard");
    } else {
      res.render("404");
    }
  } catch (err) {
    next(err);
  }
};
const teacherDashboard = async (req, res) => {
  if (req.session.user) {
    const results = await Result.findAll();
    res.render("dashboard", {
      user: req.session.user,
      results: results,
    });
  } else {
    res.render("404");
  }
};

const deleteResult = async (req, res) => {
  await Result.destroy({
    where: {
      id: req.params.id,
    },
  });
  console.log("result deleted Sucesssfully !!!!");
  res.redirect("/api/teacher/dashboard");
};

const getupdateResult = async (req, res) => {
  try {
    if (req.session.user) {
      const result = await Result.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.render("editResult", {
        result: result,
        identity: req.params.id,
      });
    } else {
      res.render("404");
    }
  } catch (err) {
    next(err);
  }
};
const postUpdateResult = async (req, res) => {
  let editResult = {
    studentName: req.body.studentName,
    rollNo: req.body.rollNo,
    score: req.body.score,
    dob: req.body.dob,
    supervisor: req.session.user,
  };
  await Result.update(editResult, { where: { id: req.params.id } });
  console.log("Updated Successfully");
  res.redirect("/api/teacher/dashboard");
};
const logoutTeacher = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      res.send("Error");
    } else {
      res.redirect("/");
    }
  });
};
module.exports = {
  registerTeacher,
  getAllResult,
  loginTeacher,
  teacherDashboard,
  logoutTeacher,
  addStudentResult,
  deleteResult,
  getupdateResult,
  postUpdateResult,
  getRegisterPage,
};
