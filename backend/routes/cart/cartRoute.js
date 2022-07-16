/* Authored by Vanshika Gohel, B00888111, vn232426@dal.ca
 */

const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/cart/cartController");
const isAdmin = require("../../middlewares/isAdmin");
const isAuthenticated = require("../../middlewares/isAuthenticated");


//APIs
router.post('/checkout',isAuthenticated, cartController.checkout);
router.put('/checkin',isAuthenticated, isAdmin, cartController.checkin);


module.exports = router;