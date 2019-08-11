const mongoose = require("mongoose");
const user_schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: "Title is required"
    },
    password: {
      type: String,
      required: "Password is required"
    },
    email: {
      type: String,
      required: "Email is required"
    },
    mono: {
      type: String,
      required: "Mobile is required"
    },
    address: {
      type: String,
      required: "Address is required"
    },
    about: {
      type: String
    },
    path: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", user_schema);
