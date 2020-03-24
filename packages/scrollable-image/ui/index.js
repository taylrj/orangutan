const express = require('express')
const path = require('path')

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/index.html'))
})

module.exports = {
  app,
}
