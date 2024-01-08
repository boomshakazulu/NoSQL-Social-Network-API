const { Thought, User } = require("../models");

module.exports = {
  //gets all thoughts
  async getAllThoughts(req, res) {
    try {
      const thought = await Thought.find();
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //gets 1 thought for id
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      !thought
        ? res.status(404).json({ message: "No thought with this ID" })
        : res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //creates a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //updates an existing thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        {
          $set: req.body,
        },
        {
          runValidators: true,
          new: true,
        }
      );
      !thought
        ? res.status(404).json({ message: "No thought by ID" })
        : res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //deletes and existing thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      await User.findOneAndUpdate(
        { _id: req.body.userID },
        { $pull: { thoughts: thought._id } },
        { new: true }
      );
      !thought
        ? res.status(404).json({ message: "thought not found with that ID" })
        : res.json({ message: "thought has been deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //creates a reaction to a thought
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      !thought
        ? res.status(404).json({ message: "No friend found with that id" })
        : res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //deletes a reaction
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      !thought
        ? res.status(404).json({ message: "no thought found with that ID" })
        : res.json({ thought });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
