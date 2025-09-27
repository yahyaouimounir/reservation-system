const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

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
ressourceSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Ressouces", ressourceSchema);
