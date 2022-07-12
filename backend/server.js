const express = require('express')
const path = require('path')
const connectDatabase = require('./config/db')
const defaultErrorHandler = require('./middlewares/errorHandler')

connectDatabase()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(defaultErrorHandler)

app.use('/api/books', require('./routes/bookRoutes'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..frontend/build/index.html'))
  })
}

const PORT = process.env.PORT || 4000
app.listen(PORT, console.log(`Server running on port ${PORT}`))
