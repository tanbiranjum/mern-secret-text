import { promisify } from 'util'
import jwt from 'jsonwebtoken'
import User from '../../models/user/user.model.js'
import AppError from '../../utils/appError.js'
import { catchAsync } from '../../utils/catchAsync.js'

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: true,
    httpOnly: true,
  }

  // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

  res.cookie('jwt', token, cookieOptions)

  user.password = undefined

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  })
}

export const signup = async (req, res, next) => {
  const newUser = await User.create({
    nickName: req.body.nickName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  })

  createSendToken(newUser, 201, res)
}

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  //1. Check if email & password exist
  if (!email || !password) {
    return next('Please provide email and password')
  }

  //2. Check if email and password is correct
  const user = await User.findOne({ email }).select('+password')

  const passwordIsCorrect = await user.correctPassword(password, user.password)

  if (!user || !passwordIsCorrect) {
    return next(new AppError('Email or password is incorrect', 401))
  }

  createSendToken(user, 200, res)
})

export const protect = catchAsync(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt
  }

  if (!token) {
    return next(new AppError('You are not logged in', 401))
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  if (!decoded.id) {
    return next(new AppError('Invalid token', 401))
  }

  const user = await User.findById(decoded.id)

  if (!user) {
    return next(new AppError('User does not exist! Please login again', 401))
  }

  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please login again', 401)
    )
  }

  req.user = user
  next()
})
