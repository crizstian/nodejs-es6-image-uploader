const serverSettings = {
  port: process.env.PORT || 9000,
  ssl: require('./ssl'),
  uplPort: process.env.PORT2 || 5500
}

module.exports = Object.assign({}, { serverSettings })
