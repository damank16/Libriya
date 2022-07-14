const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user_id : String,
    booking_id : String,
    room_id: String,
    title : String,
    description: String
})

const StudyRoomBookings = mongoose.model('studyroombookings', schema);

module.exports = StudyRoomBookings;