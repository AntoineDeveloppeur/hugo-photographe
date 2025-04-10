import express from 'express'
import userCtrl from '../controllers/user.js'

const router = express.Router()


router.put('/modifyPassword',userCtrl.modifyPassword)
router.post('/signUp',userCtrl.signUp)

export default router