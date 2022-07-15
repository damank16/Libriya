const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is a required field"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is a required field"],
    },
    password: {
      type: String,
      required: [true, "Password is a required field"],
    },
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
    },
    province: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    favorites: {
      type: [Schema.ObjectId],
      default: [],
      ref: "book",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
