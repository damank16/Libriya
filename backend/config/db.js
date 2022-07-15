const { connect } = require('mongoose')
async function connectDatabase() {
  try {
    console.log(process.env.MONGO_URI)
    const { connection } = await connect("mongodb+srv://group12:group12pwd@libriya.slwkd4n.mongodb.net/libriya?retryWrites=true&w=majority")
    console.log(`MongoDB connection established to ${connection.host}`)
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }
}

module.exports = connectDatabase
