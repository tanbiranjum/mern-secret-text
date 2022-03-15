import express, { json } from 'express'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import hpp from 'hpp'
import cookieParser from 'cookie-parser'

import './config.js'

import cors from 'cors'
import morgan from 'morgan'
import textRouter from './routes/text/text.route.js'
import userRouter from './routes/user/user.route.js'

import AppError from './utils/appError.js'

const app = express()

app.use(helmet())

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
})

app.use('/api', limiter)

app.use(mongoSanitize())

app.use(xss())

app.use(hpp())

app.use(cookieParser())

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)

app.use(
  json({
    limit: '10kb',
  })
)
app.use(morgan('tiny'))
app.use('/api/v1/text', textRouter)
app.use('/api/v1/user', userRouter)

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Can't find the requested url ${req.originalUrl} on this server`
    ),
    404
  )
})

app.use((err, req, res, next) => {
  console.log(err.stack)

  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  })
})

export default app
