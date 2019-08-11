const mongoose = require("mongoose");
const like_schema = mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: "Post is Required Field"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: "User is Required Field"
    }
  },
  {
    timestamps: true
  }
);

like_schema.index({ post: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Like", like_schema);
