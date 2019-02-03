const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const KeyPairSchema = new Schema({
  public: { type: String, required: true },
  private: { type: String, required: true },
  timeOfChange: { type: Date, required: true }
});

module.exports = KeyPair = model("KeyPair", KeyPairSchema);
