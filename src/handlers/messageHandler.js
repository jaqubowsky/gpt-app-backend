const Message = require("../models/messageModel.js");
const Room = require("../models/roomModel.js");

const createMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.params;

    const room = await Room.findById(id).exec();

    if (!room) {
      return res.status(404).json({ success: false, error: "Room not found" });
    }

    const message = await Message.create({
      content,
      user: req.user.id,
      room: room.id,
    });

    room.messages.push(message);

    await room.save();

    res.status(201).json({ success: true, message });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getUserMessages = async (req, res) => {
  try {
    const { id } = req.user;

    const messages = await Message.find({ user: id }).exec();

    res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { createMessage, getUserMessages };
