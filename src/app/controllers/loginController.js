const User = require("../models/User");
class loginController {
  // [GET] /login
  show = (req, res, next) => {
    res.render("./login/login", {
      titlePage: "Login",
      css: ["login.css"],
      javascript: [{ type: "module", file: "login.js" }],
    });
  };

  // [GET] /login/sign-up
  signUp = (req, res, next) => {
    res.render("./login/signUp", {
      titlePage: "Sign Up",
      css: ["login.css"],
      javascript: [
        { type: "module", file: "login.js" },
        { type: "module", file: "signUp.js" },
      ],
    });
  };

  // [GET] /login/all
  showJson = async (req, res, next) => {
    User.find({})
      .then((listUser) => {
        listUser = Array.from(listUser);
        listUser = listUser.map((user) => user.toObject());

        res.json(listUser);
      })
      .catch((err) => next(err));
  };

  // [POST] /login/sign-up
  signUpStore = async (req, res, next) => {
    const newUser = await new User(req.body, User);
    var check;

    await User.find({ username: req.body.username })
      .then((user) => {
        if (user.length) {
          res.json({ status: "Username is exist" });
        } else {
          newUser.save();
          res.json({ status: "Sign in successful" });
        }
      })
      .catch((err) => next(err));
  };

  // [GET] /delete/:id
  deleteUser = (req, res, next) => {
    User.findOneAndDelete({ _id: req.params.id }).then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.json({ error: "Not found" });
      }
    });
  };

  // [GET] /logout
  logout = async (req, res, next) => {
    try {
      // (await await req.session) == null;
      req.session.destroy();
    } catch (err) {
      console.error("Error logging out:", err);
      return next(new Error("Error logging out"));
    }
    var notify = req.query.notify;
    console.log(notify);

    return res.redirect(`/?notify="${notify}"`);
  };
}

module.exports = new loginController();
