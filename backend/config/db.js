const { connect } = require('mongoose')
async function connectDatabase() {
  try {
    const MONGO_URI = "mongodb+srv://group12:group12pwd@libriya.slwkd4n.mongodb.net/libriya?retryWrites=true&w=majority";
    const { connection } = await connect(MONGO_URI)
    console.log(`MongoDB connection established to ${connection.host}`)
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }
}

module.exports = connectDatabase
