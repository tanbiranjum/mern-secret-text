import Text from '../../models/text/text.model.js'
import { catchAsync } from '../../utils/catchAsync.js'

export const getText = catchAsync(async (req, res, next) => {
  const text = await Text.findById(req.params.id)

  if (!text) {
    return next(new AppError('No text found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      text,
    },
  })
})

export const getTextByUser = catchAsync(async (req, res, next) => {
  const text = await Text.find({ sender: req.params.id })

  if (!text) {
    return next(new AppError('No text found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      text,
    },
  })
})

export const inbox = catchAsync(async (req, res, next) => {
  const text = await Text.find({ receiver: req.params.id }).populate('receiver')

  if (!text) {
    return next(new AppError('No text found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      text,
    },
  })
})

export const createText = catchAsync(async (req, res, next) => {
  const text = await Text.create(req.body)

  res.status(201).json({
    status: 'success',
    data: {
      text,
    },
  })
})

export const deleteText = catchAsync(async (req, res, next) => {
  const text = await Text.findByIdAndDelete(req.params.id)

  if (!text) {
    return next(new AppError('No text found with that ID', 404))
  }

  res.status(204).json({
    status: 'success',
    data: null,
  })
})
