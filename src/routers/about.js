const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  var user;
  if (req.user)
    user = req.user.username; 
  res.render("about", {
    titlePage: "about",
    css: ["about.css"],
    user: user,
  });
});

module.exports = router;
