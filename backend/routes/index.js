const router = require("express").Router();
// const { } = require('../controllers/<folder_path>/file_name_without_extension')
const { defaultController } = require("../controllers");

router.get("/", defaultController);

module.exports = router;
