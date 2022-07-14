const router = require("express").Router();
const { searchController } = require("../controllers/searchBookController");

router.post("/searchbooks",searchController);

module.exports = router;
