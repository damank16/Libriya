/* Authored by Vanshika Gohel, B00888111, vn232426@dal.ca
 */
const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    user_id: String,
    bookId: String,
    checkout_date: String,
    checkin_date: String
})

exports.Cart = mongoose.model('cart', cartSchema);