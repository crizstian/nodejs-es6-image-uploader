const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
// const spdy = require('spdy')
const path = require('path')
const compress = require('compression')
const proxy = require('http-proxy-middleware')

const start = (config) => {
  return new Promise((resolve, reject) => {
    const {port
      // , ssl
    } = config

    if (!port) {
      reject(new Error('The server must be started with an available port'))
    }

    const app = express()
    app.use(morgan('dev'))
    app.use(cors())
    app.use(helmet())
    app.use(compress())
    app.use('/api', proxy({
      target: 'https://producmex.herokuapp.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      },
      logLevel: 'debug'
    }))

    app.use('/thumbnail', proxy({
      target: 'http://localhost:5500',
      changeOrigin: true,
      pathRewrite: {
        '^/thumbnail': ''
      },
      logLevel: 'debug'
    }))

    app.use((err, req, res, next) => {
      reject(new Error('Something went wrong!, err:' + err))
      res.status(500).send('Something went wrong!')
      next()
    })
    app.use(express.static(`${__dirname}/dist`))

    app.get('/*', (req, res) => {
      res.sendFile(path.join(`${__dirname}/dist/index.html`))
    })

    const server = app.listen(port, () => resolve(server))

    // const server = spdy.createServer(ssl, app)
    //     .listen(port, () => resolve(server))
  })
}

module.exports = Object.assign({}, {start})
