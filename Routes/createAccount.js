const users = require("../models/users.models");
const validator = require("validator");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (validator.isEmail(email)) {
      let userExists = await users.findOne({ email: email });
      if (userExists) {
        res.redirect("/api/login");
      } else {
        let passwordHash = await bcrypt.hash(password, 10);
        let newUser = new users({
          email: email,
          password: passwordHash,
        });
        d = await newUser.save();
        res.status(200).redirect("/api/login");
      }
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (e) {
    console.log(e);
  }
};
