const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1/Artwork");
    console.log("Connect database sucessfully");
  } catch (error) {
    console.log("Connect database failed");
  }
}
module.exports = { connect };
