const express = require("express");
const router = express.Router();
const searchController = require("../app/controllers/searchController");

// [GET] /search
router.get("/", searchController.show);

module.exports = router;
