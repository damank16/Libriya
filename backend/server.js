const express = require('express')
const { resolve } = require('path')
const connectDatabase = require('./config/db')
const defaultErrorHandler = require('./middlewares/errorHandler')
require('dotenv').config()

connectDatabase()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/books', require('./routes/bookRoutes'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(resolve(__dirname, '../frontend/build')))
  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, '..frontend/build/index.html'))
  })
}

app.use(defaultErrorHandler)

const PORT = process.env.PORT || 4000
app.listen(PORT, console.log(`Server running on port ${PORT}`))
