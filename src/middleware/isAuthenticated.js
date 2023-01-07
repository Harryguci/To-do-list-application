var isAuthenticated = (req, res, next) => {
  // console.log("USER: ", req.user);

  if (req.isAuthenticated()) return next();
  res.redirect("/error");
};

module.exports = isAuthenticated;
