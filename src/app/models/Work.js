const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Work = new Schema({
  title: { type: "string", default: "Title" },

  hour: { type: "string", default: "hh:mm" },
  date: { type: "string", default: "dd" },
  month: { type: "string", default: "mm" },
  year: { type: "string", default: "yyyy" },

  content: { type: "string", default: "" },
  createAt: { type: "date", default: Date.now() },
  updateAt: { type: "date", default: Date.now() },
  delete: { type: "boolean", default: false }, // has deleted ?
  finished: { type: "boolean", default: false }, // has finished ?
  type: { type: "string", default: "Common work" },
  short_description: { type: "string", default: "" },
});

const model = mongoose.model("works", Work);
module.exports = model;
