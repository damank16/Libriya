/* Authored by Vanshika Gohel, B00888111, vn232426@dal.ca
 */

const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/cart/cartController");


//APIs
router.post('/checkout',cartController.checkout);
router.put('/checkin',cartController.checkin);


module.exports = router;