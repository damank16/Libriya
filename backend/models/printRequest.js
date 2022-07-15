const { Schema, model } = require('mongoose')


const printRequestSchema = Schema(
    {
        request_id: {
        type: String,
        required: true,
      },
      user_id: {
        type: String,
        required: true,
      },
      user_name: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      width: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
      Location: {
        type: String,
        required: false,
      },
      isAccepted: {
        type: String,
        default: "",
      },
    },
    { timestamps: true }
  )
  
  module.exports = model('print_requets', printRequestSchema)