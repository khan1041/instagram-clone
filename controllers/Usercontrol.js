


import { User } from "../models/UserScema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/datauri.js";
import dotenv from 'dotenv'
import multer from "multer";
import fs from 'fs';

 dotenv.config()
 import { v2 as cloudinary } from "cloudinary";

 
  
export const ragister=async(req,res)=>{


try {
    const{username,email,password}=req.body

    if(!username|| !email|| !password){

      return res.status(401).json({msg:"something is missing"})

    }

    const user=await User.findOne({email})
   
    if(user){
       return res.status(401).json({msg:'other email use please'})
    }
   
    const strongPassword=await bcrypt.hash(password,10)

     await User.create({
        username,email,password:strongPassword
     })
 
     return res.status(201).json({msg:"Successfully"})
   
} catch (error) {
    console.log(error)
}}


//Login--//

export const Login=async(req,res)=>{

try {
    const { email, password, role } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
       // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token=await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.username}`,
            user,
            success: true
        })

 
} catch (error) {
    console.log(error)
}}


//logout
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//suggestedUsers


export const getSuggestedUsers = async (req, res) => {
    try {
        const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select("-password");
        if (!suggestedUsers) {
            return res.status(400).json({
                message: 'Currently do not have any users',
            })
        };
        return res.status(200).json({
            success: true,
            users: suggestedUsers
        })
    } catch (error) {
        console.log(error);
    }
};



//follow and unfollow



export const followOrunfollow=async(req,res)=>{

 try {
    const follow=req.id //me
    const followingme=req.params.id //others

    if(follow===followingme){
        return res.status(400).json({msg:"you cant follow/unfollow"})
    }

const user=await User.findById(follow)

const Mytargate=await User.findById(followingme)

if(!user|| !Mytargate){
    return res.status(400).json({msg:"user not found"})
}

const isFollowing=user.following.includes(followingme)

if(isFollowing){
    await Promise.all([
    User.updateOne({_id:follow},{$pull:{following:followingme}}),
   
    User.updateOne({_id:followingme},{$pull:{followers:follow}}),


])
return res.status(200).json({ message: 'Unfollowed successfully', success: true });

}

else{

await Promise.all([

User.updateOne({_id:follow},{$push:{following:followingme}}),
User.updateOne({_id:followingme},{$push:{followers:follow}})

])
return res.status(200).json({ message: 'followed successfully', success: true });

}


 } catch (error) {
    console.log(error)
 }


}



//updateProfile
export const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { bio, gender } = req.body;
        const profilePicture = req.file;
        let cloudResponse;

        if (profilePicture) {
            const fileUri = getDataUri(profilePicture);
            cloudResponse = await cloudinary.uploader.upload(fileUri);
        }

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({
                message: 'User not found.',
                success: false
            });
        };
        if (bio) user.bio = bio;
        if (gender) user.gender = gender;
        if (profilePicture) user.profilePicture = cloudResponse.secure_url;

        await user.save();

        return res.status(200).json({
            message: 'Profile updated.',
            success: true,
            user
        });


    } catch (error) {
        console.log(error);
    }
}




