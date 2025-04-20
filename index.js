import express from "express";
import trainer_routes from "./src/modules/trainer/trainer_routes.js";
import member_routes from "./src/modules/member/member_routes.js";
import { connectDB } from "./DB/db-connection.js";
import dotenv from 'dotenv';
dotenv.config();  // تحميل المتغيرات من ملف .env

const app = express();

app.use(express.json());

connectDB();
app.use("/trainer", trainer_routes);
app.use("/member", member_routes);

app.listen(8080, console.log("sever run on port 8080... "));
