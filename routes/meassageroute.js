


import express from "express";
 import {isAuthenticated} from "../middlewares/isAdmin.js";

import upload from '../middlewares/Multer.js'
import { getMessage, sendMessage } from "../controllers/meassage.js";
//import {sendMessage,getMessage} from "../controllers/meassage.js"
const Chatrouter = express.Router();

Chatrouter.route('/send/:id').post(isAuthenticated, sendMessage);
 Chatrouter.route('/all/:id').get(isAuthenticated, getMessage);
 
export default Chatrouter;

