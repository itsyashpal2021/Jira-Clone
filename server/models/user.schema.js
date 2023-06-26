const mongoose = require("../utils/mongoDB");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: mongoose.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
