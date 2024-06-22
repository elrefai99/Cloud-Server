import { Application } from 'express'
import * as http from 'http'
import * as io from 'socket.io'
import { configDotEnv } from './Config/env/env'
configDotEnv()


export default (app: Application) => {
  const server = http.createServer(app)
  const ioSocket = new io.Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
  })

  ioSocket.on('connection', (cred: any) => {
    console.log('a user connect')

    cred.on('disconnect', () => {
      console.log(`user ${cred.id} left.`)
    })
  })

  // MongoDB connection
  const port = process.env.SOCKET_PORT || 9001 as number
  server.listen(port, () => {
    console.log('Server socket listening on ws://localhost:9001')
  })
}
