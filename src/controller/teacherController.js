const teacherCollection = require("../models/teacherModel.js");
const resultCollection = require("../models/resultModel.js");
const bcrypt = require("bcrypt");
const token = "sjdjdndnddkkdk";
const registerTeacher = async (req, res) => {
  await bcrypt.hash(req.body.password, 10).then(async (hash) => {
    console.log(hash);
    let info = {
      teacherName: req.body.teacherName,
      teacherUsername: req.body.teacherUsername,
      password: hash,
    };
    await teacherCollection.insertMany([info]);
  });
  res.redirect("/");
};
const getAllResult = async (req, res) => {
  const results = await resultCollection.find();
  res.status(200).send(results);
};

const getRegisterPage = async (req, res) => {
  res.render("registerTeacher");
};

const loginTeacher = async (req, res) => {
  const teacher = await teacherCollection.findOne({
    teacherUsername: req.body.username,
  });

  if (teacher) {
    const password_valid = await bcrypt.compare(
      req.body.password,
      teacher.password
    );
    if (password_valid) {
      req.session.user = teacher.teacherName;
      res.cookie("user-token", token, {
        expires: new Date(Date.now() * 5000),
        httpOnly: true,
      });
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
      const result = await resultCollection.insertMany([detailResult]);
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
    const filter = {};
    const results = await resultCollection.find(filter);
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
      const result = await resultCollection.findById({
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
  await resultCollection.findByIdAndUpdate(req.params.id, editResult);
  console.log("Updated Successfully");
  res.redirect("/api/teacher/dashboard");
};
const logoutTeacher = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      res.send("Error");
    } else {
      res.clearCookie("user-token");
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
