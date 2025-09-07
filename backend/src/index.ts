import  express from 'express';
import connectDb from './config/db.js';
import dotenv from 'dotenv'
import authRouter from './routes/auth.routes.js'
import transactionRoute from './routes/transaction.routes.js'
import cors from 'cors';
const app = express();
  
dotenv.config();
connectDb();   //connecting db

app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = ['http://localhost:3000', 'https://finance-tracker-iota-lac.vercel.app'];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
app.use(express.json());


app.use("/api/v1/auth",authRouter);
app.use("/api/v1/transaction",transactionRoute)

app.listen(8080,()=>{
    console.log("Server is running on port 8080");
    
})