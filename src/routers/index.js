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
const isAuthenticated = require("../middleware/isAuthenticated"); // middleware for authenticating users

// Create a new work
router.get("/creatework", WorkController.create);
router.get("/create", isAuthenticated, CreateController.show);
router.post("/create/new", CreateController.create);

// Delete works
router.use("/delete", deleteRouter);

// Edit
router.use("/edit", editRouter);

// Finish
router.use("/finish", finishRouter);

// Search
router.use("/search", searchRouter);

// About
router.use("/about", aboutRouter);

// Login
router.use("/login", loginRouter);

// Show all works
router.get("/all/json", WorkController.showAllJson);
router.get("/", WorkController.show);
router.get("/:slug", WorkController.showError);

module.exports = router;
