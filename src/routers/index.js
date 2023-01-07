const express = require("express");
const router = express.Router();

const WorkController = require("../app/controllers/workController");
const CreateController = require("../app/controllers/createController");

const finishRouter = require("./finish");
const deleteRouter = require("./delete");
const aboutRouter = require("./about");
const searchRouter = require("./search");
const editRouter = require("./edit");
const loginRouter = require("./login");
const accountRouter = require("./account");

const isAuthenticated = require("../middleware/isAuthenticated"); // middleware for authenticating users
const isLogin = require("../middleware/isLogin");
// Create a new work
router.get("/creatework", WorkController.create);
router.get("/create", isAuthenticated, CreateController.show);
router.post("/create/new", CreateController.create);

// Delete works
router.use("/delete", isAuthenticated, deleteRouter);

// Edit
router.use("/edit", isAuthenticated, editRouter);

// Finish
router.use("/finish", isAuthenticated, finishRouter);

// Search
router.use("/search", isAuthenticated, searchRouter);

// About
router.use("/about", aboutRouter);

// Login
router.use("/login", loginRouter);

// Account
router.use("/account", isAuthenticated, accountRouter);

// Show all works
router.get("/all/json", WorkController.showAllJson);
router.get("/", isAuthenticated, WorkController.show);

router.get(
  "/:slug",
  (req, res, next) => {
    // console.log(req.user === undefined);
    if (req.user) {
      next();
    }
    res.redirect("/login");
  },
  WorkController.showError
);

module.exports = router;
