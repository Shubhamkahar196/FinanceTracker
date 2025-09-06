import express from 'express';
import connectDb from './config/db.js';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
connectDb(); //connecting db
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
//# sourceMappingURL=index.js.map