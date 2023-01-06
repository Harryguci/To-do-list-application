const User = require("../models/User");

class accountController {
  show = (req, res, next) => {
    // var user = req.user;

    User.findOne({ _id: req.user._id })
      .then((user) => {
        user = user.toObject();

        console.log(user);
        res.render("./account/account", {
          titlePage: "Account",
          css: ["account.css"],
          userCurrent: user,
          user: user.username,
          javascript: [{ type: "module", file: "account.js" }],
        });
      })
      .catch((err) => {
        next(err);
      });
  };
}

module.exports = new accountController();
