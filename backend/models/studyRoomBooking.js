const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    booking_id : {
        type : String,
        required: true
    },
    room_id : {
        type: String,
        required: true,
        unique: true
    },
    user_id : {
        type: String,
        required: true,
        unique: true
    },
    title : String,
    description: String
})

const StudyRoomBookings = mongoose.model('studyroombookings', schema);

module.exports = StudyRoomBookings;