const Room = require("../models/roomModel.js");
const User = require("../models/userModel.js");

const createRoom = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, error: "Name is required" });
    }

    if (!email) {
      return res
        .status(400)
        .json({ success: false, error: "Email is required" });
    }

    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const room = await Room.create({
      name,
      owner: req.user.id,
      users: [req.user.id],
    });

    room.users.push(user);

    await room.save();

    res.status(201).json({ success: true, room });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getRoomMessages = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await Room.findById(id).populate("messages").exec();

    res.status(200).json({ success: true, messages: room.messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const addUserToRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const room = await Room.findById(id).exec();

    if (!id) {
      return res.status(400).json({ success: false, error: "Id is required" });
    }

    if (!email) {
      return res
        .status(400)
        .json({ success: false, error: "Email is required" });
    }

    if (!room) {
      return res.status(404).json({ success: false, error: "Room not found" });
    }

    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    if (user._id.equals(req.user.id)) {
      return res
        .status(400)
        .json({ success: false, error: "Cannot add yourself to room" });
    }

    if (room.users.includes(user._id)) {
      return res
        .status(400)
        .json({ success: false, error: "User already in room" });
    }

    if (room.users.length >= 2) {
      return res
        .status(400)
        .json({ success: false, error: "Room can only fit 2 users." });
    }

    room.users.push(user);

    await room.save();

    res.status(200).json({ success: true, room });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { createRoom, getRoomMessages, addUserToRoom };
