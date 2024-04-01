const User = require("../models/user");

async function GetUser(username, id, email) {
  try {
    let user;
    if (username) {
      user = await User.findOne({ username: username }).lean();
    } else if (id) {
      user = await User.findOne({ _id: id }).lean();
    } else if (email) {
      user = await User.findOne({ email: email }).lean();
    } else {
      throw new Error("Please provide either username, id, or email");
    }

    if (user) {
      return user; // User exists
    } else {
      return null; // User does not exist
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = GetUser;
