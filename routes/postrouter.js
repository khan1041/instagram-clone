




import express from 'express'
import {addNewPost,addComment,getAllPost,getUserPost,likePost,dislikePost,getCommentsOfPost,deletePost,bookmarkPost } from '../controllers/post.js'

const Postrouter = express.Router();

import upload from '../middlewares/Multer.js'
import { isAuthenticated } from '../middlewares/isAdmin.js';
Postrouter.route("/addpost").post(isAuthenticated, upload.single('image'), addNewPost);
Postrouter.route("/all").get(isAuthenticated,getAllPost);
Postrouter.route("/userpost/all").get(isAuthenticated, getUserPost);
Postrouter.route("/like/:id").get(isAuthenticated, likePost);
Postrouter.route("/dislike/:id").get(isAuthenticated, dislikePost);
Postrouter.route("comment/:id").post(isAuthenticated, addComment); 
Postrouter.route("comment/all/:id").post(isAuthenticated, getCommentsOfPost);
Postrouter.route("/delete/:id").delete(isAuthenticated, deletePost);
Postrouter.route("/:id/bookmark").get(isAuthenticated, bookmarkPost);



export default Postrouter












