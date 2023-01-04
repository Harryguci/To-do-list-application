const User = require("../models/User");

class loginController {
  // [GET] /login
  show = (req, res, next) => {
    res.render("./login/login", {
      titlePage: "Login",
      css: [],
    });
  };

  // [GET] /login/sign-up
  signUp = (req, res, next) => {
    res.render("./login/signUp", {
      titlePage: "Sign Up",
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
}

module.exports = new loginController();
