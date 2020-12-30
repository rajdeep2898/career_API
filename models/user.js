var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    altTitle: {
      type: Array,
      default: [],
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
// userSchema.index({ title: "text", altTitle: "text", slug: "text" });
const User = mongoose.model("users", userSchema);
// User.createIndexes();
module.exports = User;
