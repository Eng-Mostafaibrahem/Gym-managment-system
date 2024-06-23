import  express from "express"
import  trainer_routes from "./src/modules/trainer/trainer_routes.js"
import  member_routes from "./src/modules/member/member_routes.js"
import  db_connection  from "./DB/Model/db-connection.js";
const app = express();

app.use(express.json());

db_connection
app.use('/trainer',trainer_routes)
app.use("/member",member_routes)

app.listen(3000,console.log("sever run on port 3000... "))