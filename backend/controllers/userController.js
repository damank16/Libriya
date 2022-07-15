// Author: Nikita Kothari

const expressAsyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const updateUser = expressAsyncHandler(async (req, res) => {
  const { body } = req;
  delete body.password;
  const user = await User.findByIdAndUpdate(req.user._id, body);
  return res.status(200).send({
    success: true,
    message: "User Updated",
  });
});

const register = expressAsyncHandler(async (req, res) => {
  const { body } = req;
  const isUserExist = await User.findOne({ email: body.email }).lean();
  if (isUserExist) {
    return res.status(409).send({
      message: "User Already Exist",
      success: false,
    });
  }
  const hashedPassword = await bcrypt.hash(body.password, saltRounds);
  delete body.password;
  const user = (
    await User.create({ ...body, password: hashedPassword })
  ).toJSON();
  user.token = jwt.sign(user, process.env.JWT_SECRET_KEY);
  return res.status(200).send({
    success: true,
    user,
  });
});

const login = expressAsyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email }).lean();
  const hash = await bcrypt.compare(password, user.password);
  if (!hash) {
    return res.status(400).send({
      message: "Unauthenticated",
    });
  }
  delete user.password;
  delete user.__v;
  user.token = jwt.sign(user, process.env.JWT_SECRET_KEY);
  res.status(200).send({
    success: true,
    message: "Logged in successfully",
    user,
  });
});

const changePassword = expressAsyncHandler(async (req, res) => {
  const { password, newPassword } = req.body;
  const user = await User.findById(req.user._id).lean();
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).send({
      message: "Old Password incorrect",
      success: false,
    });
  }
  const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);
  user.password = newHashedPassword;
  const updatedUser = await User.findByIdAndUpdate(user._id, user);
  return res.status(200).send({
    message: "User Updated Successfully",
    success: true,
    user: updatedUser,
  });
});

const currentUser = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  return res.status(200).send({
    message: "User fetched",
    user,
  });
});

const toggleFavorite = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { body } = req;
  const favorites = user.favorites;
  let message = "Book removed from favorites";
  if (favorites.includes(mongoose.Types.ObjectId(body.bookId))) {
    const index = favorites.indexOf(mongoose.Types.ObjectId(body.bookId));
    if (index !== -1) {
      favorites.splice(index, 1);
    }
  } else {
    favorites.push(mongoose.Types.ObjectId(body.bookId));
    message = "Book added to favorites";
  }
  user.favorites = favorites;
  await user.save();
  return res.status(200).send({
    message,
    success: true,
  });
});

const getMyFavoriteBooks = expressAsyncHandler(async (req, res) => {
  const { favorites } = await User.findById(req.user._id)
    .populate("favorites")
    .select("favorites");

  return res.status(200).send({
    message: "Favourite books fetched",
    success: true,
    books: favorites,
  });
});

module.exports = {
  register,
  login,
  changePassword,
  currentUser,
  updateUser,
  toggleFavorite,
  getMyFavoriteBooks,
};
