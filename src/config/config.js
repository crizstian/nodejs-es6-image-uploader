const serverSettings = {
  port: process.env.PORT || 9000,
  ssl: require('./ssl')
}

module.exports = Object.assign({}, { serverSettings })
