const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    room_id : {
        type : String,
        required: true,
        unique: true
    },
    room_name : {
        type: String,
        required: true,
        unique: true
    },
    is_available : Boolean
})

const StudyRooms = mongoose.model('studyrooms', schema);

module.exports = StudyRooms;