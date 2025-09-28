const tasks = require("../models/Tasks.models");
const users = require("../models/users.models");

module.exports = async (req, res) => {
  try {
    const { task } = req.body;
    let person = await users.findOne({ email: req.session.passport.user});
    let id = person._id.toString();
    let newTask = new tasks({
      task: task,
      user: id,
    });
    await newTask.save();
    res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};
