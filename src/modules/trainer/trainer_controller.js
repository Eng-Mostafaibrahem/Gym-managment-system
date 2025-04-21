import Trainer from "../../../DB/Model/trainer.model.js";
import Member from "./../../../DB/Model/member.model.js";

export const addTrainer = async (req, res) => {
  const { name, startduration, endduration } = req.body;

  if (!name || !startduration || !endduration) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const trainer = await Trainer.create({
      name,
      start_duration: startduration,
      end_duration: endduration,
    });
    return res
      .status(201)
      .json({ message: "Trainer added successfully", data: trainer });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getTrainer = async (req, res) => {
  try {
    const trainers = await Trainer.findAll({
      where: { is_deleted: false },
    });
    return res.status(200).json({ message: "Trainers found", data: trainers });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getSpecificTrainer = async (req, res) => {
  const { id } = req.params;

  try {
    const trainer = await Trainer.findOne({
      where: { trainer_id: id, is_deleted: false },
    });
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }
    return res.status(200).json({ message: "Trainer found", data: trainer });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export const updateTrainer = async (req, res) => {
  const { name, startduration, endduration } = req.body;
  const { id } = req.params;

  if (!name || !startduration || !endduration) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const trainer = await Trainer.findOne({ where: { trainer_id: id } });
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    trainer.name = name;
    trainer.start_duration = startduration;
    trainer.end_duration = endduration;
    await trainer.save();

    return res
      .status(200)
      .json({ message: "Trainer updated successfully", data: trainer });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteTrainer = async (req, res) => {
  const { id } = req.params;

  try {
    const trainer = await Trainer.findByPk(id);
    if (!trainer || trainer.is_deleted) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    // Soft delete
    await trainer.update({ is_deleted: true });

    return res
      .status(200)
      .json({ message: "Trainer soft deleted successfully" });
  } catch (err) {
    console.error("❌ Error soft deleting trainer:", err.message);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

export const getDeletedTrainer = async (req, res) => {
  try {
    const trainers = await Trainer.findAll({
      where: { is_deleted: true },
    });
    return res.status(200).json({ message: "Trainers found", data: trainers });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const revenuesSpecificTrainer = async (req, res) => {
  const { id } = req.params;

  try {
    const trainer = await Trainer.findOne({ where: { trainer_id: id } });
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    const revenue = await Member.sum("membership_cost", {
      where: {
        trainer_id: id,
      },
    });

    return res
      .status(200)
      .json({ message: "Revenue found", data: { revenuetrainer: revenue } });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
