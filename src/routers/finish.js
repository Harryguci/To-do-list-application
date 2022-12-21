const finishController = require("../app/controllers/finishController");
const express = require("express");
const router = express.Router();

router.get("/:id", finishController.finishOne);
router.get("/", finishController.show);

module.exports = router;
