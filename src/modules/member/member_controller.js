import Member from "../../../DB/Model/member.model.js";
export const addMember = async (req, res) => {
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
  ) {
    return res.status(400).json({ message: "all fields are required" });
  }

  try {
    const newMember = await Member.create({
      name,
      phone_number: phonenumber,
      national_id: nationalid,
      status,
      start_membership: startmembership,
      end_membership: endmembership,
      membership_cost: membershipcost,
      trainer_id: trainerid,
    });

    return res.status(201).json({
      message: "Member added successfully",
      data: newMember,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getMember = async (req, res) => {
  try {
    const members = await Member.findAll();
    return res.status(200).json({
      message: "Members retrieved successfully",
      data: members,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getSpecificMember = async (req, res) => {
  const { id } = req.params;

  try {
    const member = await Member.findByPk(id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    return res.status(200).json({
      message: "Member found",
      data: member,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateMember = async (req, res) => {
  const { id } = req.params;
  const { name, startmembership, endmembership, membershipcost, trainerid } =
    req.body;

  try {
    const member = await Member.findByPk(id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    member.name = name || member.name;
    member.start_membership = startmembership || member.start_membership;
    member.end_membership = endmembership || member.end_membership;
    member.membership_cost = membershipcost || member.membership_cost;
    member.trainer_id = trainerid || member.trainer_id;

    await member.save();

    return res
      .status(200)
      .json({ message: "Member updated successfully", data: member });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteMember = async (req, res) => {
  const { id } = req.params;

  try {
    const member = await Member.findByPk(id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    member.deleted = true;
    await member.save();

    return res.status(200).json({ message: "Member deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getDeletedMember = async (req, res) => {
  try {
    const trainers = await Member.findAll({
      where: { deleted: true },
    });
    return res.status(200).json({ message: "Trainers found", data: trainers });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const revenuesMember = async (req, res) => {
  try {
    const result = await Member.sum("membership_cost");
    return res.status(200).json({
      message: "Revenue found",
      data: { revenuesMember: result },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
