// Author: Nikita Kothari

const router = require("express").Router();
const {
  register,
  login,
  updateUser,
  currentUser,
  addFavoriteBook,
} = require("../controllers/userController");

const isAuthenticated = require("../middlewares/isAuthenticated");

router.route("/").post(register).put(isAuthenticated, updateUser);

router.route("/me").get(isAuthenticated, currentUser);

router.route("/login").post(login);

router.route("/add-favorite").post(isAuthenticated, addFavoriteBook);
// router
//   .route("/:id")
//   .get(getUser)
//   .delete(deleteUser)
//   .put(updateUser);

module.exports = router;
