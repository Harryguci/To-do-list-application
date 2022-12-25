const express = require("express");
const router = express.Router();

// const Work = require("../app/models/Work");
const WorkController = require("../app/controllers/workController");
const CreateController = require("../app/controllers/createController");
const EditController = require("../app/controllers/editController");

const finishRouter = require("./finish");
const deleteRouter = require("./delete");
const aboutRouter = require("./about");
const searchRouter = require("./search");

// Create a new work
router.get("/creatework", WorkController.create);
router.get("/create", CreateController.show);
router.post("/create/new", CreateController.create);

// Delete works
router.use("/delete", deleteRouter);

// Edit
router.post("/edit/detail", EditController.editDetail);
router.get("/edit/:id", EditController.editOne);
router.get("/edit", EditController.show);

// Finish
router.use("/finish", finishRouter);

// Search
router.use("/search", searchRouter);

// About
router.use("/about", aboutRouter);

// Show all works
router.get("/all/json", WorkController.showAllJson);
router.get("/", WorkController.show);
router.get("/:slug", WorkController.showError);

module.exports = router;
