const mongoose = require("mongoose");

//Credential model which shows how the credentials are stored in the database
let credentialSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
});

module.exports = mongoose.model("Credential", credentialSchema);
