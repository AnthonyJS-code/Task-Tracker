const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const users = require("../models/users.models");
const validator = require("validator");

module.exports = new localStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      if (validator.isEmail(email)) {
        const user = await users.findOne({ email: email });
        if (!user) {
          return done(null, false);
        }
        let comparepasswords = await bcrypt.compare(password, user.password);
        if (comparepasswords) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } else {
        return done(null, false);
      }
    } catch (e) {
      return done(err);
    }
  }
);
