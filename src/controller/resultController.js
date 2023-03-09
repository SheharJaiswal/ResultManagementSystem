const resultCollection = require("../models/resultModel.js");

const loginStudent = async (req, res) => {
  const student = await resultCollection.findOne({
    where: [
      { studentName: req.body.studentName },
      { rollNo: req.body.rollNo },
      {
        dob: req.body.dob,
      },
    ],
  });
  if (
    req.body.studentName == student.studentName &&
    req.body.rollNo == student.rollNo &&
    req.body.dob == student.dob
  ) {
    req.session.studentUser = student.studentName;
    req.session.rollNo = student.rollNo;
    res.redirect("studentDashboard");
  } else {
    res.send("Invalid Username");
  }
};
const studentDashboard = async (req, res) => {
  if (req.session.studentUser) {
    const result = await resultCollection.findOne({
      where: [
        { rollNo: req.session.rollNo },
        { studentName: req.session.studentUser },
      ],
    });

    res.render("studentDashboard", {
      studentUser: req.session.studentUser,
      scoreCard: result,
    });
  } else {
    res.render("404");
  }
};
const getAllResult = async (req, res) => {
  const results = await resultCollection.find();
  res.status(200).send(results);
};

const getResultByRollno = async (req, res) => {};
module.exports = { loginStudent, studentDashboard };
