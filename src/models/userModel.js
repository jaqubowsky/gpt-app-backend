const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    authentication: {
      hashedPassword: {
        type: String,
        required: true,
        minLength: 8,
      },
      salt: {
        type: String,
      },
    },
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: "room",
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "message",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
