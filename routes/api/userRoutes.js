const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser);

router.route("/:userid").put(updateUser);

router.route("/").post(createUser);

module.exports = router;
