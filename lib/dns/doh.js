const fs = require('fs')
const { playdoh } = require('playdoh')

// Defaults
const options = {
  // udp4 (IPv4) or udp6 (IPv6)
  protocol: 'udp4',

  // Defaults to 0.0.0.0 (udp4) or ::0 (udp6)
  localAddress: '',

  // Defaults to 127.0.0.1 (udp4) or ::1 (udp6)
  resolverAddress: '8.8.8.8',

  // Standard DNS port
  resolverPort: 53,

  // Maximum DNS lookup duration
  timeout: 10000,

  // Server key
  key: fs.readFileSync('key.pem'),

  // Server cert
  cert: fs.readFileSync('cert.pem')
}

const middleware = playdoh(options)

const connect = require('connect')
const { createSecureServer } = require('http2')
const app = connect()
app.use(middleware)

const DOHServer = createSecureServer(options, app)
DOHServer.listen(3000)
module.exports = DOHServer
