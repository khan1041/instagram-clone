

import express from 'express'
import { ragister,Login,logout,updateProfile,getSuggestedUsers,followOrunfollow } from '../controllers/Usercontrol.js'
import upload from '../middlewares/Multer.js'
import { isAuthenticated } from '../middlewares/isAdmin.js'
const router=express.Router()

router.post('/register',upload.single("profile"),ragister)
router.post('/login',Login)
router.get('/logout',logout)
router.post("/update",isAuthenticated,updateProfile)

router.post("/follow/:id",isAuthenticated,followOrunfollow)
export default router



