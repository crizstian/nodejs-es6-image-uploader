const cors = require('cors')
const path = require('path')
const express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')
const rimraf = require('rimraf')
const morgan = require('morgan')
const mkdirp = require('mkdirp')

const start = (config) => {
  return new Promise((resolve, reject) => {
    let app = express()

    app.use(cors())
    app.use(morgan('dev'))
    app.use(bodyParser.json())

    const uploadPath = `${__dirname}/uploads/`

    mkdirp.sync(uploadPath)

    let storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, uploadPath)
      },
      filename: (req, file, cb) => {
        let ext = path.extname(file.originalname)
        cb(null, `${Math.random().toString(36).substring(7)}${ext}`)
      }
    })

    let upload = multer({ storage: storage })

    app.get('/', (req, res) => {
      res.status(200).send('Fake Upload Service Running.')
    })

    app.use('/uploads', express.static(`${__dirname}/uploads`))

    app.post('/thumbnail', upload.any(), (req, res) => {
      rimraf.sync(path.resolve(__dirname, '/uploads/*'))
      const url = `https://producmex-front.herokuapp.com:${config.uplPort}/uploads/${req.files[0].filename}`
      console.log(url)
      res.status(200).json({img: url})
    })

    const server = app.listen(config.uplPort, () => resolve(server))
  })
}

module.exports = Object.assign({}, {start})
