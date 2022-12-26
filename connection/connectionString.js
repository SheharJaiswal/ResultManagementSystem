module.exports = function () {
  const dbConfig = require("../src/config/dbConfig.js");
  var mysqlx = require("mysqlx");
  mysqlx
    .getSession({
      host: dbConfig.HOST,
      port: dbConfig.port,
      dbUser: dbConfig.USER,
      dbPassword: dbConfig.PASSWORD,
    })
    .then(function (session) {
      var schema = session.getSchema(dbConfig.DB);
      schema.existsInDatabase().then(function (exists) {
        if (!exists) {
          session.createSchema(dbConfig.DB).then(function (schema) {
            console.log("Schema created");
            session.close();
          });
        } else {
          console.log("Schema already exists");
        }
      });
    })
    .catch(function (err) {
      console.log(err.message);
      console.log(err.stack);
    });
};
