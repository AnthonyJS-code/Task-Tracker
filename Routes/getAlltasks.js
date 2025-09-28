const tasks = require("../models/Tasks.models");
const user = require("../models/users.models");

module.exports = async (req, res) => {
  const person = await user.findOne({ email: req.session.passport.user });
  const id = person._id.toString();
  const allPersonTasks = await tasks
    .find({ user: id })
    .select("-updatedAt -createdAt -__v -user");
  res.json({ data: allPersonTasks });
};
