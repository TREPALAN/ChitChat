const mongoose = require("mongoose");

const moment = require("moment");

const privateMessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isReceived: {
    type: Boolean,
    default: false,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

// Virtual reformation date
privateMessageSchema.virtual("dateFormatted").get(function () {
  const currentDate = moment();
  const messageDate = moment(this.date);
  const duration = moment.duration(currentDate.diff(messageDate));

  if (duration.asDays() >= 1) {
    return `${Math.floor(duration.asDays())} day(s) ago`;
  }

  if (duration.hours() >= 1) {
    return `${duration.hours()} hour(s) ago`;
  }

  if (duration.minutes() >= 1) {
    return `${duration.minutes()} minute(s) ago`;
  }

  return "Just now";
});

module.exports = mongoose.model("PrivateMessage", privateMessageSchema);
