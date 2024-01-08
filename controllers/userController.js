const { User, Thought } = require("../models");

module.exports = {
  //gets all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //get a single user based on id
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("friends");

      !user
        ? res.status(404).json({ message: "No user with that ID found" })
        : res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //creates a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // updates an existing user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      !user
        ? res.status(404).json({ message: "No user with that ID found" })
        : res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // deletes an existing user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      !user
        ? res.status(404).json({ message: "No user with that ID found" })
        : await Thought.deleteMany({
            _id: {
              $in: user.thoughts,
            },
          });
      res.json({
        message: "User and associated thoughts successfully deleted!",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //adds friend to a user
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        {
          $addToSet: {
            friends: req.params.friendId,
          },
        },
        {
          runValidators: true,
          new: true,
        }
      );
      !user
        ? res.status(404).json({ message: "No friend found with that ID" })
        : res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //removes friend from that user
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        {
          _id: req.params.userId,
        },
        {
          $pull: {
            friends: req.params.friendId,
          },
        },
        {
          runValidators: true,
          new: true,
        }
      );
      !user
        ? res.status(404).json({ message: "No friend found with that ID" })
        : res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
