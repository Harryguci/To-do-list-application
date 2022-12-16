const express = require("express");
const router = express.Router();
// const Work = require("../app/models/Work");
const WorkController = require("../app/controllers/workController");

// Show all works
router.get("/", WorkController.show);

// Create a new work
router.get("/creatework", WorkController.create);

// Delete works
router.get('/delete/all', WorkController.deleteAll);
router.get('/delete/:id', WorkController.delete);

module.exports = router;
