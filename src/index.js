'use strict'
const uploads = require('./server/uploader')
const config = require('./config')

console.log('--- Uploader Server ---')

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})

uploads.start(config)
  .then(app => {
    console.log('----------------------------------------------------------------------------')
    console.log(`Uploader Server started succesfully, running on port: ${app.address().port}.`)
    console.log('----------------------------------------------------------------------------')
  })
  .catch(err => console.log(err))
