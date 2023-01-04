const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, default: "", required: true },
  password: { type: String, default: "", required: true },
  deleted: { type: Boolean, default: false },
  email: { type: String, default: "" },
});

const model = mongoose.model("user", User);
module.exports = model;
