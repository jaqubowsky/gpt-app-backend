const { z } = require("zod");
const roomService = require("../services/roomService.js");

const emailSchema = z.string().email("Invalid email provided. Try again.");
const mongoIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid room id provided. Try again.");

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
    const { id: roomId } = req.params;
    const { email } = req.body;

    const emailResult = emailSchema.safeParse(email);
    const idResult = mongoIdSchema.safeParse(roomId);

    if (!emailResult.success) {
      throw new Error(emailResult.error.issues[0].message);
    }

    if (!idResult.success) {
      throw new Error(idResult.error.issues[0].message);
    }

    const room = await roomService.addUserToRoom(roomId, email);

    res.status(200).json({ success: true, room });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { createRoom, getRoomMessages, addUserToRoom };
