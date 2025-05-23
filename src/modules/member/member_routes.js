import { Router } from "express";
import * as memberControler from "./member_controller.js";
const routes = Router();

routes.post("/addmember", memberControler.addMember);
routes.get("/getmember", memberControler.getMember);
routes.get("/deletedmember", memberControler.getDeletedMember);
routes.get("/getspecificmember/:id", memberControler.getSpecificMember);
routes.put("/updatemember/:id", memberControler.updateMember);
routes.put("/deletemember/:id", memberControler.deleteMember);
routes.get("/memberrevenues", memberControler.revenuesMember);

export default routes;
