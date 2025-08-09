import { DataTypes } from "sequelize";
import sequelize from "../utils/dbHelper.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
  },
  {
    tablename: "tb_user",
  }
);

export default User;
