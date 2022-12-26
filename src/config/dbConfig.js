module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "root",
  DB: "ResultDB",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    accquire: 30000,
    idle: 10000,
  },
};
