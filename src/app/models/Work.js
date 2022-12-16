const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Work = new Schema({
  title: { type: "string", default: "Title" },
  time: { type: "date", default: Date.now() },
  content: { type: "string", default: "" },
  createAt: { type: "date", default: Date.now() },
  updateAt: { type: "date", default: Date.now() },
  delete: { type: "boolean", default: false },
});

const model = mongoose.model("works", Work);
module.exports = model;
