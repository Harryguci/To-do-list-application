const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/blog_nodejs_dev", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected successfully !");
    
  } catch (err) {
    console.log("Connect failed");
  }
}

module.exports = { connect }; // exports a function(promise)