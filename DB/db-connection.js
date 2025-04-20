import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import mysql2 from "mysql2";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectModule: mysql2, // تحديد mysql2 كموديل للاتصال
    logging: false, // شيلها لو عايز تشوف الاستعلامات
  }
);

// دالة التأكد من الاتصال
export const connectDB = async () => {
  try {
    await sequelize.authenticate(); // يتأكد من الاتصال
    console.log("✅ Database connected successfully.");

    // لو عايز تزامن الجداول مع قاعدة البيانات
    await sequelize.sync({ alter: true }); // تقدر تستخدم force: true لو عايز تمسح الجداول وتعيد إنشائها
    console.log("✅ Tables synced successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
  }
};
