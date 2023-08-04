const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateRole,
  deleteUser,
} = require("../controlleres/userController");
const { isAuth, authorizedRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuth, getUserDetails);
router.route("/password/update").put(isAuth, updatePassword);
router.route("/me/update").put(isAuth, updateProfile);
router.route("/admin/users").get(isAuth, authorizedRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuth, authorizedRoles("admin"), getSingleUser)
  .put(isAuth, authorizedRoles("admin"), updateRole)
  .delete(isAuth, authorizedRoles("admin"), deleteUser);

module.exports = router;
