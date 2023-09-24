const roomService = require("../services/roomService.js");

const createRoom = async (req, res) => {
  try {
    const { name } = req.body;

    const room = await roomService.createRoom(name, req.user.id);

    res.status(201).json({ success: true, room });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getRoomMessages = async (req, res) => {
  try {
    const { id } = req.params;

    const messages = await roomService.getRoomMessages(id);

    res.status(200).json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const addUserToRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const room = await roomService.addUserToRoom(id, email);

    res.status(200).json({ success: true, room });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { createRoom, getRoomMessages, addUserToRoom };
