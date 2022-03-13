import mongoose from 'mongoose'

const textSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'sender is required'],
    ref: 'User',
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
    required: [true, 'must have a text body'],
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
  isOpened: {
    type: Boolean,
    default: false,
  },
})

const Text = mongoose.model('Text', textSchema)

export default Text
