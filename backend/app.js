import dotenv from 'dotenv';
import express from 'express';
import connectDB from './database/db.js';
import router1 from './routes/user_router.js';
import userRouter from './routes/list_router.js'

dotenv.config();


connectDB();
const app = express();
app.use(express.json())



app.use('/api/v1',router1)


app.use('/api/v2',userRouter)


app.listen(process.env.PORT||3000,(res,req)=>{
    console.log(`Listening on port ${process.env.PORT}`);
})

