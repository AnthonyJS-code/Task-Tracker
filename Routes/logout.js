module.exports = async (req, res) => {
  res.clearCookie("Session");
  req.logout((err) => {
    if (err) {
      return console.log(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return console.log("MMM");
      }
      res.redirect("/");
    });
  });
};
