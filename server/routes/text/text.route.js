import {
  inbox,
  getText,
  getTextByUser,
  deleteText,
  createText,
} from './text.controller.js'
import { protect } from '../user/auth.controller.js'
import { Router } from 'express'

const textRouter = Router()

textRouter.get('/inbox/:id', protect, inbox)
textRouter.get('/sent/:id', protect, getTextByUser)
textRouter.post('/', protect, createText)
textRouter.route('/:id').get(protect, getText).delete(protect, deleteText)

export default textRouter
