const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("about", {
    titlePage: "about",
    css: ["about.css"],
  });
});

module.exports = router;
