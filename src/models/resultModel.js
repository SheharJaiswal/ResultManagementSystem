module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define("result", {
    studentName: {
      type: DataTypes.STRING,
      allowNull: false, // true by default
    },
    rollNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    supervisor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maximumMarks: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  });
  return Result;
};
