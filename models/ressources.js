const mongoose = require("mongoose");

const ressourceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Ressource", ressourceSchema);
