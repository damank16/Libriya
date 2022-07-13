const mongoose = require('mongoose');

const schema  = mongoose.Schema;

const bookSchema = new schema({
    id:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true

    },
    author:{
        type:String,
        required:true

    },
    genre:{
        type: String,
        required:true
    },
    publisher:{
        type: String,
        required:true
    },
    publicationYear:{
        type:String,
        required:true
    },
} , { timestamps: true });

module.exports = mongoose.model('Books',bookSchema,"Books");
