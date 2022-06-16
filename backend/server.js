const express = require('express')
const path = require('path')

const app = express()

app.use(express.json())
// app.use('/', require('./routes/<folder_path>/file_name_without_extension'))
app.use('/', require('./routes'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../frontend/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
  })
}

const PORT = process.env.PORT || 4000
app.listen(PORT, console.log(`Server running on port ${PORT}`))
