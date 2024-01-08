const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtsController");

router.route("/").get(getAllThoughts).post(createThought);
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);
router.route("/api/thoughts/:thoughtId/reactions").post(createReaction);
router
  .route("/api/thoughts/:thoughtId/reactions/:reactionId")
  .delete(deleteReaction);

module.exports = router;
