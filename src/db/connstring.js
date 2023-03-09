const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("result-management-Db connected !"))
  .catch(() => {
    console.log("failed to connect");
  });
