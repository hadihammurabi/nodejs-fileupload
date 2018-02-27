const express = require('express')
const multer  = require('multer')
const fs      = require('fs')

const app     = express()

app.use('/uploads', express.static('uploads'))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    let time = new Date()
    time = `${time.getFullYear()}${time.getMonth()}${time.getDate()}${time.getHours()}${time.getMinutes()}${time.getSeconds()}`
    cb(null, `${time}-${file.originalname}`)
  }

})
const upload  = multer({ storage })

app.get('/', (req, res) => {
  if ('file' in req.query) {
    if (fs.existsSync(`uploads/${req.query.file}`)) {
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>NodeJS File Upload</title>
        </head>
        <body>
          <img src="uploads/${req.query.file}" alt="${req.query.file}">
        </body>
        </html>
      `)
    } else
      res.redirect('/')
  } else
    res.sendFile(`${__dirname}/pages/index.html`)
})

app.post('/upload', upload.single('image'), (req, res) => {
  res.redirect('/')
})

app.listen(8080, () => {
  console.log('NodeJS file upload run using port 8080')
})
