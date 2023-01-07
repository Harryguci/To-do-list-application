const User = require("../models/User");
const Work = require("../models/Work");
const {
  isValidPassword,
  createHash,
} = require("../../middleware/hashPassword");
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
        javascript: [{ type: "module", file: "notification" }],
        userCurrent: data[1],
        works: data[0],
        user: data[1].username,
        javascript: [{ type: "module", file: "account.js" }],
        notify: req.query.notify,
      });
    });
  };

  edit = (req, res, next) => {
    const user = req.body;
    // res.json(user);
    // return;
    if (user) {
      User.findOne({ _id: req.user._id })
        // check Old password and input password.
        // then (user) || reject (res.redirect)
        .then((userCurrent) => {
          if (user.password && isValidPassword(userCurrent, user.oldPassword)) {
            user.password = createHash(user.password);
            return (userCurrent);
          } else reject("Password is not matches");
        })
        // Update information
        .then(async (userCurrent) => {
          console.log("User current: " + userCurrent, "New user: " + user);
          await User.findOneAndUpdate({ _id: userCurrent._id }, user);
          return res.redirect(
            "/account?notify=Change your account successfully."
          );
        })
        .catch((err) => res.redirect(`/account?notify=${err}.`));
    } else {
      res.redirect("/account?notify=Can not change your account.");
    }
  };
}

module.exports = new accountController();
