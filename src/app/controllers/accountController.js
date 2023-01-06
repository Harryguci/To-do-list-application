const User = require("../models/User");
const Work = require("../models/Work");
class accountController {
  show = (req, res, next) => {
    // var user = req.user;

    const promiseWork = new Promise((resolve, reject) => {
      Work.find({ user: req.user.username })
        .then((works) => {
          works = Array.from(works);
          works = works.map((work) => work.toObject());
          resolve(works);
        })
        .catch((err) => reject(err));
    });
    const promiseUser = new Promise((resolve, reject) => {
      User.findOne({ _id: req.user._id })
        .then((user) => {
          user = user.toObject();
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });

    Promise.all([promiseWork, promiseUser]).then((data) => {
      res.render("./account/account", {
        titlePage: "Account",
        css: ["account.css"],
        userCurrent: data[1],
        works: data[0],
        user: data[1].username,
        javascript: [{ type: "module", file: "account.js" }],
      });
    });
  };
}

module.exports = new accountController();
