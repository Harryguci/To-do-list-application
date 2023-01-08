const express = require("express");
const router = express.Router();
const loginController = require("../app/controllers/loginController");
const passport = require("../middleware/passport");
const isLogin = require("../middleware/isLogin");

// router.get("/successful", function (req, res) {
//   res.json({
//     user: req.user,
//     status: "Login successful",
//   });
// });

router.get("/fail", function (req, res) {
  res.redirect("/login/sign-up?notify=Username is available");
});

router.get("/sign-up", loginController.signUp);
router.get("/delete/:id", loginController.deleteUser);
router.get("/all", loginController.showJson);
router.get("/", isLogin, loginController.show);
router.post(
  "/",
  passport.authenticate("login", {
    failureRedirect: `/login?notify="Your information are Wrong Format"`, // Nếu xác thực không đúng
    successRedirect: `/?notify="Login successfully"`, // Nếu xác thực được chấp nhận
  })
);
router.get("/logout", loginController.logout);

router.post(
  "/sign-up",
  passport.authenticate("signup", {
    failureRedirect: "/login/fail",
    successRedirect: `/login?notify="Sign Up new user successfully"`,
  })
);

/* Handle Logout */
router.get("/signout", function (req, res) {
  req.logout(res.redirect("/"));
});

module.exports = router;
