module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define("teacher", {
    teacherName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teacherUsername: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Teacher;
};
