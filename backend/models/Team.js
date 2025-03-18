const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    teamname: { type: String, required: true },
    memname1: { type: String, required: true },
    memname2: { type: String, required: true },   
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
