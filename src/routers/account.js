const express = require("express");
const router = express.Router();
const accountController = require("../app/controllers/accountController");
const { isValidPassword, createHash } = require("../middleware/hashPassword");



router.post("/", accountController.edit);
router.get("/", accountController.show);

module.exports = router;
