const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  textInput: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("document", documentSchema);