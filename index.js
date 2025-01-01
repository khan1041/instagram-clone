



import express from 'express'
import conectedDb from './db/dbconection.js'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes/userroutes.js'
import { v2 as cloudinary } from "cloudinary";

import cookieParser from "cookie-parser";
import { errorMiddleware } from './middlewares/errorhandel.js';
//import { errorMiddleware } from './midelware/errorhandel.js';
import fileUpload from 'express-fileupload'
const app = express()
app.use(express.json())

app.use(cookieParser());

export default app

app.use("/uplods",express.static("./uplods"))
app.use(
  cors({
    origin:true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);



app.use('/app/auth',router)


const port=8000


app.use(fileUpload({

  useTempFiles:true,
  tempFileDir:"/tmp",
 }))
 app.use(express.static('public'))



 dotenv.config()

 cloudinary.config({ 
  cloud_name:process.env.CLOUD_NAME, 
  api_key:process.env. CLOUD_API_KEY, 
  api_secret:process.env.API_SECRET_KEY  // Click 'View API Keys' above to copy your API secret
});

 


 
 app.use(errorMiddleware)

conectedDb().then(()=>{
  app.listen(port,()=>{
   console.log(`surver is running at port:${port}`)    
  })
})







