const express = require("express");
require("dotenv").config();
const eurekaHelper = require("./eurekaHelper.js");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.set("views", ["./src/views", "./src/views/student", "./src/views/teacher"]);
app.set("view engine", "ejs");
const teachRouter = require("./src/routes/teacherRouter");
const resultRouter = require("./src/routes/resultRouter");
var expressLayouts = require("express-ejs-layouts");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressLayouts);
app.set("layout", "layouts/layout");
app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
    cookie: {
      // Session expires after 10 min of inactivity.
      expires: 600000, //
    },
  })
);
app.use("/api/teacher", teachRouter);
app.use("/api/result", resultRouter);
app.get("/", (req, res) => {
  res.render("home", {
    title: "Result Management",
    logout: "Logout Sucessfully.....!",
  });
});
app.listen(port, () => console.log(`http://localhost:${port}`));
eurekaHelper.registerWithEureka("result-service", port);
