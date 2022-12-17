const express = require("express");
const router = express.Router();
// const Work = require("../app/models/Work");
const WorkController = require("../app/controllers/workController");


// Create a new work
router.get("/creatework", WorkController.create);

// Delete works
router.get('/delete/all', WorkController.deleteAll);
router.get('/delete/:id', WorkController.delete);
// Show all works
router.get("/all", WorkController.showAll);
router.get("/", WorkController.show);

module.exports = router;
