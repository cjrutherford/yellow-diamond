const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const KeyPairSchema = new Schema({
  public: { type: String, required: true },
  private: { type: String, required: true },
  timeOfChange: { type: Date, required: true }
});

module.exports = KeyPair = mongoose.model("KeyPair", KeyPairSchema);
