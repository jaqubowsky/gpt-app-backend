const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "room",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", messageSchema);
