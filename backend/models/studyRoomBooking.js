// Author: Vignesh Panemangalore Nayak

const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user_id : {
        type : String,
        required: true,
        unique: false
    },
    booking_id : String,
    room_id: String,
    title : String,
    description: String
})

const StudyRoomBookings = mongoose.model('studyroombookings', schema);

module.exports = StudyRoomBookings;