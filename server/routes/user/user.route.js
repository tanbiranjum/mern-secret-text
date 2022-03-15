import { Router } from 'express'
import { signup, login, logout, isAuthenticated } from './auth.controller.js'
const router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)

router.get('/authenticated', isAuthenticated)

export default router