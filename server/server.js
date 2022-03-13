import { createServer } from 'http'
import mongoose from 'mongoose'
import app from './app.js'

const PORT = process.env.PORT

const MONGO_URL = `mongodb+srv://secret-text:Dvs4rD5ot94xBvuD@cluster0.g1v0r.mongodb.net/text?retryWrites=true&w=majority`

mongoose.connection.once('open', () => {
    console.log('MongoDB connection is ready!')
})

mongoose.connection.once('error', () => {
    console.error('Connection is failed')
})

async function startServer() {
  await mongoose.connect(MONGO_URL)
  const server = createServer(app)

  server.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
  })
}

startServer()
