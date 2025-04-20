import { Router } from "express";
const router = Router();
import * as trainerController from "./trainer_controller.js";

router.post("/addtrainer", trainerController.addTrainer);
router.get("/gettrainer", trainerController.getTrainer);
router.get("/getDeletedTrainer", trainerController.getDeletedTrainer);
router.get("/getspecifictrainer/:id", trainerController.getSpecificTrainer);
router.put("/updatespecifictrainer/:id", trainerController.updateTrainer);
router.put("/deletespecifictrainer/:id", trainerController.deleteTrainer);
router.get("/trainerrevenue/:id", trainerController.revenuesSpecificTrainer);

export default router;
