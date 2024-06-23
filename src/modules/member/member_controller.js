import db_connection from "../../../DB/Model/db-connection.js";
import axios from "axios";

export const addMember = (req, res, next) => {
  const {
    name,
    phonenumber,
    nationalid,
    status,
    startmembership,
    endmembership,
    membershipcost,
    trainerid,
  } = req.body;

  if (
    !name ||
    !phonenumber ||
    !nationalid ||
    !status ||
    !startmembership ||
    !endmembership ||
    !membershipcost ||
    !trainerid
  )
    return res.json({ message: "all field is required" });
  const addQuery = `INSERT INTO member(name,phone_number,national_id,status,start_membership,end_membership, membership_cost,trainer_id) VALUES('${name}','${phonenumber}','${nationalid}','${status}','${startmembership}','${endmembership}','${membershipcost}','${trainerid}')`;
  db_connection.execute(addQuery, (err, result) => {
    if (err) return res.json({ message: err.message });
    if (!result.affectedRows) return res.json({ message: "error in query" });
    return res.json({
      message: "added successfully",
      data: result.affectedRows,
    });
  });
};

export const getMember = (req, res, next) => {
  const selectQuery = `select * from member`;
  db_connection.execute(selectQuery, (err, result) => {
    if (err) {
      return res.json({ error: "error in query", err: err.message });
    }
    return res.json({ message: "MEMBERS", data: result });
  });
};

export const getSpecificMember = async (req, res) => {
  const { id } = req.params;
  const selectQuery = `select name,start_membership,end_membership,membership_cost , deleted from member WHERE member_id =${id}`;
  let now = new Date();
  let day = now.getDate();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();
  let currentDate = day + "/" + month + "/" + year;
  db_connection.execute(selectQuery, (err, result) => {
    if (err) {
      return res.json({ error: "error in query", err: err.message });
    }
    if (result.length == 0) return res.json({ message: "member not found" });

    let member_endmembership = result[0].end_membership.split("/");
    let compareDate = currentDate.split("/");
    if (compareDate[2] > member_endmembership[2]) {
      return res.json({
        message: "this member is not allowed to enter the gym",
      });
    } else if (compareDate[1] > member_endmembership[1]) {
      return res.json({
        message: "this member is not allowed to enter the gym",
      });
    } else if (
      compareDate[1] > member_endmembership[1] &&
      compareDate[0] > member_endmembership[0]
    ) {
      return res.json({
        message: "this member is not allowed to enter the gym",
      });
    }

    return res.json({ message: "MEMBER Found", data: result });
  });
};

export const updateMember = async (req, res, next) => {
  const { name, startmembership, endmembership, membershipcost, trainerid } =
    req.body;
  const { id } = req.params;

  if (
    !name ||
    !startmembership ||
    !endmembership ||
    !membershipcost ||
    !trainerid
  )
    return res.status(400).json({messag:"all field is required"});

  let member = await axios.get(
    `http://localhost:3000/member/getspecificmember/${id}`
  );

  if (!member?.data?.data)
    return res.status(404).json({ message: "member not found" });
  const updateQuery = `UPDATE member SET name='${name}',start_membership='${startmembership}',end_membership='${endmembership}',membership_cost ='${membershipcost}',trainer_id='${trainerid}' WHERE member_id=${id}`;
  db_connection.execute(updateQuery, (err, result) => {
    if (err) {
      return res.json({ err: err.message });
    }
    if (result.affectedRows == 1)
      return res.json({
        message: "member updated successfully",
      });
  });
};

export const deleteMember = async (req, res, next) => {
  const { id } = req.params;
  let member = await axios.get(
    `http://localhost:3000/member/getspecificmember/${id}`
  );
  if (!member?.data?.data)
    return res.status(404).json({ message: member.data.message });

  let softDelete = `UPDATE member SET deleted= '1' where member_id=${id}`;
  db_connection.execute(softDelete, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    return res.status(200).json({ message: "member deleted successfully" });
  });
};

export const revenuesMember = (req, res, nexr) => {
  let revenues = `SELECT SUM(membership_cost) as revenuesMember from member`;
  db_connection.execute(revenues, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    return res.status(200).json({ message: "revenue found ", data: result });
  });
};
