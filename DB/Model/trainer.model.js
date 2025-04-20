// models/Trainer.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db-connection.js";

export const Trainer = sequelize.define(
  "Trainer",
  {
    trainer_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    end_duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "trainer",
    timestamps: true,
  }
);

export default Trainer;
