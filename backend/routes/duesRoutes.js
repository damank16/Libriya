// Author: Damandeep Kaur
const router = require("express").Router()
const {
  getDuesController,
  updatesDuesController,
} = require("../controllers/duesController")
const isAuthenticated = require("../middlewares/isAuthenticated")

router.post("/api/dues/", getDuesController)
router.put("/api/updateDues/", updatesDuesController)

module.exports = router
