import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  nickName: {
    type: String,
    required: [true, 'a user must have a nick name'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'a user must have a email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'a user must have a password'],
    minlength: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'must have a password confirm'],
    validate: {
      validator: function (el) {
        return el === this.password
      },
      message: 'Passwords are not same',
    },
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
  status: {
    type: String,
    enum: ['unverified', 'verified', 'banned'],
    default: 'unverified',
  },
  passwordChangedAt: Date,
})

userSchema.pre('save', async function (next) {
  //if password doesn't modified yet then simply return
  //modified means we updated after we ist save it to database
  //It will return next whenever update takes place
  //becuase we don't want to modified password every time
  if (!this.isModified('password')) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined
  next()
})

userSchema.methods.correctPassword = async function (
  givenPassword,
  exactPassword
) {
  return await bcrypt.compare(givenPassword, exactPassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    )

    return JWTTimestamp < changedTimestamp
  }
  return false
}

const User = mongoose.model('User', userSchema)

export default User

/**
 * TODO: email validation
 * TODO: password verification
 */
