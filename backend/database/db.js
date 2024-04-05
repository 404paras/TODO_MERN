import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoDb = process.env.MONGODB_URI


const connectDB = async()=>{

    try {
        
await mongoose.connect(mongoDb,{
    dbName:"Todo"
}).then(()=>{
    console.log("Database connection established")
})

    } catch (error) {
        console.log(error)
    }
}

export default connectDB;