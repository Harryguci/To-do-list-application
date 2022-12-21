const express = require("express");
const router = express.Router();
const DeleteController = require("../app/controllers/deleteController");

// Delete works
router.get("/", DeleteController.show);
router.get("/all", DeleteController.deleteAll);
router.get("/:id/forever", DeleteController.removeBin);
router.get("/:id/undo", DeleteController.undoBin);
router.get("/:id", DeleteController.deleteById);

module.exports = router;
