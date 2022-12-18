const express = require("express");
const router = express.Router();
// const Work = require("../app/models/Work");
const WorkController = require("../app/controllers/workController");
const CreateController = require("../app/controllers/createController");
const EditController = require("../app/controllers/editController");
const DeleteController = require("../app/controllers/deleteController");

// Create a new work
router.get("/creatework", WorkController.create);
router.get("/create", CreateController.show);
router.post("/create/new", CreateController.create);
// Delete works
router.get("/delete", DeleteController.show);
router.get("/delete/all", WorkController.deleteAll);
router.get("/delete/:id/forever", DeleteController.removeBin);
router.get("/delete/:id/undo", DeleteController.undoBin);

router.get("/delete/:id", DeleteController.deleteById);
// Edit
router.get("/edit", EditController.show);

// Show all works
router.get("/all", WorkController.showAll);
router.get("/all/json", WorkController.showAllJson);
router.get("/", WorkController.show);

module.exports = router;
