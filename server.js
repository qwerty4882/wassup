const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const Port = process.env.PORt || 5500
app.use(express.static('./public'))

// const start = () =>
//   app.listen(Port, () => {
//
//   })
// start()

http.listen(Port, () => {
  console.log(`listen at ${Port}`)
})

// Socket
io.on('connection', (socket) => {
  console.log('connected....')
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg)
  })
})
