import  express from 'express';
import connectDb from './config/db.js';
import dotenv from 'dotenv'
import authRouter from './routes/auth.routes.js'
const app = express();
  
dotenv.config();
connectDb();   //connecting db

app.use(express.json());


app.use("/api/v1/auth",authRouter);


app.listen(8080,()=>{
    console.log("Server is running on port 8080");
    
})