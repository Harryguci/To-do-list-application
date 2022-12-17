const express = require("express");
const router = express.Router();
// const Work = require("../app/models/Work");
const WorkController = require("../app/controllers/workController");
const CreateController = require("../app/controllers/createController");

// Create a new work
router.get("/creatework", WorkController.create);
router.get("/create", CreateController.show);
router.post("/create/new", CreateController.create);
// Delete works
router.get("/delete/all", WorkController.deleteAll);
router.get("/delete/:id", WorkController.delete);
// Show all works
router.get("/all", WorkController.showAll);
router.get("/", WorkController.show);

module.exports = router;
