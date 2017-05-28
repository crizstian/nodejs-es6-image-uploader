const serverSettings = {
  port: process.env.PORT || 5500,
  ssl: require('./ssl')
}

module.exports = Object.assign({}, { serverSettings })
