const { connect } = require('mongoose')
async function connectDatabase() {
  try {
    const { connection } = await connect(process.env.MONGO_URI)
    console.log(`MongoDB connection established to ${connection.host}`)
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }
}

module.exports = connectDatabase
