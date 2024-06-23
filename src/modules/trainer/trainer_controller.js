import db_connection from "../../../DB/Model/db-connection.js";
import axios from "axios";

export const addTrainer = (req, res, next) => {
  ////data///
  const { name, startduration, endduration } = req.body;
  ////logic/////
  if (!name || !startduration || !endduration)
    return res.json("all field are required");
  const insertQuery = `INSERT INTO trainer(name,start_duration,end_duration) VALUES('${name}','${startduration}','${endduration}')`;

  db_connection.execute(insertQuery, (err, result) => {
    if (err) {
      console.log(err.message);
      return res.json({ error: "error in query", err: err.message });
    }
    if (!result.affectedRows) {
      return res.json("user not added");
    }

    return res.json({ message: "user added successfully" });
  });
};

export const getTrainer = (req, res, next) => {
  const selectQuery = `select * from trainer`;

  db_connection.execute(selectQuery, (err, result) => {
    if (err) {
      console.log(err.message);
      return res.json({ error: "error in query", err: err.message });
    }

    return res.json({ message: "User Found", data: result });
  });
};

export const getSpecificTrainer = (req, res, next) => {
  const selectQuery = `select * from trainer WHERE trainer_id =${req.params.id}`;

  db_connection.execute(selectQuery, (err, result) => {
    if (err) {
      console.log(err.message);
      return res.json({ error: "error in query", err: err.message });
    }
    if (result.length == 0) return res.json({ message: "trainer not found" });
    return res.json({ message: "User Found", data: result });
  });
};

export const updateTrainer = async (req, res, next) => {
  const { name, startduration, endduration } = req.body;
  const { id } = req.params;

  if (!name || !startduration || !endduration) {
    return res.json({ message: "all field are required" });
  }
  const updateQuery = `UPDATE trainer SET name='${name}',start_duration='${startduration}',end_duration='${endduration}' WHERE trainer_id=${id}`;
  const specificTrainer = await axios.get(
    `http://localhost:3000/trainer/getspecifictrainer/${id}`
  );

  if (!specificTrainer?.data?.data)
    return res.json({ message: "trainer not found" });

  db_connection.execute(updateQuery, (err, result) => {
    if (err) {
      return res.json({ err: err.message });
    }
    if (result.affectedRows == 1)
      return res.json({
        message: "trainer updated successfully",
      });
  });
};

export const deleteTrainer = async (req, res, next) => {
  const { id } = req.params;
  const specificTrainer = await axios.get(
    `http://localhost:3000/trainer/getspecifictrainer/${id}`
  );
  if (!specificTrainer?.data?.data)
    return res.json({ message: "trainer not found" });
  const deleteTrainer = `  DELETE FROM trainer where trainer_id= ${id} `;

  db_connection.execute(deleteTrainer, (error, result) => {
    if (error) return res.json({ message: error.message });
    if (result.affectedRows == 1)
      return res.json({ message: "trainer deleted successfully" });
  });
};

export const revenuesSpecificTrainer = async (req, res, next) => {
  const { id } = req.params;
  let revenueTrainer = `SELECT SUM(membership_cost) as revenuetrainer from member WHERE trainer_id=${id}`;
  let trainer = await axios.get(
    `http://localhost:3000/trainer/getspecifictrainer/${id}`
  );
  if (!trainer?.data?.data)
    return res.status(404).json({ message: trainer.data.message });
  db_connection.execute(revenueTrainer, (err, result) => {
    if (err) {
      return res.json({ message: err.message });
    }
    return res.json({ message: "revenue found", data: result });
  });
};
