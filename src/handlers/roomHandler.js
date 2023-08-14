const Room = require("../models/roomModel.js");
const User = require("../models/userModel.js");

const createRoom = async (req, res) => {
  try {
    const { name } = req.body;

    const room = await Room.create({
      name,
      users: [req.user.id],
    });

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

    if (!room) {
      return res.status(404).json({ success: false, error: "Room not found" });
    }

    const user = await User.findOne({ email }).exec();

    const userInRoom = room.users.find((user) => user.email === email);

    if (userInRoom) {
      return res
        .status(400)
        .json({ success: false, error: "User already in room" });
    }

    if (room.users.length >= 2) {
      return res
        .status(400)
        .json({ success: false, error: "Room can only fit 2 users." });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    room.users.push(user);

    await room.save();

    res.status(200).json({ success: true, room });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { createRoom, getRoomMessages, addUserToRoom };
