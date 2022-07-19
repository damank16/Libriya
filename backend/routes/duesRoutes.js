// Author: Damandeep Kaur
const router = require("express").Router()
const {
  getDuesController,
  updatesDuesController,
} = require("../controllers/duesController")
const isAuthenticated = require("../middlewares/isAuthenticated")

router.post("/api/dues/", isAuthenticated ,getDuesController)
router.put("/api/updateDues/", isAuthenticated ,updatesDuesController)

module.exports = router
