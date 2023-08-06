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
    const { userId } = req.body;
    
    const room = await Room.findById(id).exec();

    const user = await User.findById(userId).exec();


    if (!room) {
      return res.status(404).json({ success: false, error: "Room not found" });
    }

    room.users.push(user);

    await room.save();

    res.status(200).json({ success: true, room });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { createRoom, getRoomMessages, addUserToRoom };
