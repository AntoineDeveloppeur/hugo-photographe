import express from 'express'
import userCtrl from '../controllers/user.js'

const router = express.Router()


router.post('/signIn',userCtrl.signIn)
router.post('/signUp',userCtrl.signUp)

export default router