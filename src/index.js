'use strict'
const server = require('./server/server')
const config = require('./config')

console.log('--- Front End Server ---')

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})

server.start(config)
  .then(app => {
    console.log(`Server started succesfully, running on port: ${config.port}.`)
  })
  .catch(err => {
    console.log(err)
  })
