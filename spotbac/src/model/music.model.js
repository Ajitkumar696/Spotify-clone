const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  uri: {
    type: String,
    required: true,
  },

  coverImage: {
    type: String,
    required: true,
  },

  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("music", musicSchema);