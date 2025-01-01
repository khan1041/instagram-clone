

import express from 'express'
import { ragister,Login,logout,updateProfile,getSuggestedUsers,followOrunfollow,alluser } from '../controllers/Usercontrol.js'
import upload from '../middlewares/Multer.js'
import { isAuthenticated } from '../middlewares/isAdmin.js'
import { blogstart,updateBlog } from '../controllers/Blogcrate.js'
const router=express.Router()

router.post('/register',upload.single("profile"),ragister)
router.post('/login',Login)
router.get('/logout',logout)
router.post("/update",isAuthenticated,updateProfile)
router.get('/users',alluser)

router.post('/Blog',upload.single("img"),blogstart)
router.post('/update/:id',upload.single("img"),updateBlog)
router.post("/follow/:id",isAuthenticated,followOrunfollow)
export default router



