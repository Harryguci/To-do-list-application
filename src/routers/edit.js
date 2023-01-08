const express = require("express");
const router = express.Router();
const EditController = require("../app/controllers/editController");

router.post("/detail", EditController.editDetail);
router.get("/:id", EditController.editOndDocument);
router.post("/:id", EditController.saveChangeDocument);
router.get("/", EditController.show);

module.exports = router;
