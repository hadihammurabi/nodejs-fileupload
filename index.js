const express = require('express')
const multer  = require('multer')

const app     = express()
const upload  = multer({ dest: "uploads/" })

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/pages/index.html`)
})

app.listen(8080, () => {
  console.log('NodeJS file upload run using port 8080')
})
