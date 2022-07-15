// Author: Nikita Kothari

const router = require("express").Router();
const {
  register,
  login,
  updateUser,
  currentUser,
  addFavoriteBook,
  toggleFavorite,
  getMyFavoriteBooks,
} = require("../controllers/userController");

const isAuthenticated = require("../middlewares/isAuthenticated");

router.route("/").post(register).put(isAuthenticated, updateUser);

router.route("/me").get(isAuthenticated, currentUser);

router.route("/login").post(login);

router
  .route("/favorites")
  .post(isAuthenticated, toggleFavorite)
  .get(isAuthenticated, getMyFavoriteBooks);
// router
//   .route("/:id")
//   .get(getUser)
//   .delete(deleteUser)
//   .put(updateUser);

module.exports = router;
