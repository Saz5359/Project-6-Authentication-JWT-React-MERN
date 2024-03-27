const mongoose = require("mongoose");

//User model which shows how the user information is stored in the database
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  org_unit: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Normal",
  },
});

module.exports = mongoose.model("user", userSchema);
