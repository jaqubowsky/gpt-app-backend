const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "message",
      },
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("room", roomSchema);