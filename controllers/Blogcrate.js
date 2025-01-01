

import { Blog } from "../models/BlogScema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/datauri.js";
import dotenv from 'dotenv'
import { v2 as cloudinary } from "cloudinary";
import { create } from "hbs";
import upload from "../middlewares/Multer.js";
 dotenv.config()

export const blogstart=async(req,res)=>{

    try {
        const{title,category,about}=req.body
        if (!title || !category || !about) {
            return res
              .status(400)
              .json({ message: "title, category & about are required fields" });
          }

     

          const uplod=await cloudinary.uploader.upload(req.file.path)
          console.log(uplod)
  
          await Blog.create({

            category,about,Blogimage:uplod.url
          })

          return res.status(201).json({msg:"BlogCreatedsucessfull"})


    } catch (error) {
        console.log(error)
    }


}

export const updateBlog=async(req,res)=>{

try {
    const{title,category,about,Blogimage}=req.body
    const updateId=req.params.id
    const update=await Blog.findById(updateId)
    const uploder=await cloudinary.uploader.upload(req.file.path)

if(!update){
    return res.status(400).json({msg:"user not found"})
}

if(title){
update.title=title
}

if(category){
    update.category=category
}
if(about){
    update.about=about
}

update.Blogimage=uploder.url
    


await update.save()
return res.status(200).json({msg:"post update",update})

} catch (error) {
    console.log(error)
}


}







