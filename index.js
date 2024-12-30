



import express from 'express'
import conectedDb from './db/dbconection.js'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes/userroutes.js'
import Chatrouter from './routes/meassageroute.js';
import Postrouter from './routes/postrouter.js';
import cookieParser from "cookie-parser";
import { errorMiddleware } from './middlewares/errorhandel.js';
//import { errorMiddleware } from './midelware/errorhandel.js';
import fileUpload from 'express-fileupload'
const app = express()
app.use(express.json())

app.use(cookieParser());

export default app



app.use(
  cors({
    origin:true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);



app.use('/app/auth',router)
app.use('/app/post',Postrouter)
app.use('/app/message',Chatrouter)

const port=8000


app.use(fileUpload({

  useTempFiles:true,
  tempFileDir:"/tmp",
 }))
 app.use(express.static('public'))



 dotenv.config()



 
 app.use(errorMiddleware)

conectedDb().then(()=>{
  app.listen(port,()=>{
   console.log(`surver is running at port:${port}`)    
  })
})







