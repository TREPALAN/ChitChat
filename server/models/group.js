const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  description: {
    type: String,
    default: "",
  },
  admin: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
  requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Group", groupSchema);
