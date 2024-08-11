import dotenv from 'dotenv';
import connectDB from "./db/index.js";

// Load environment variables from .env file
dotenv.config({ path: './env' });

// Connect to MongoDB
connectDB(()=>{
    app.listen(process.env.PORT || 8080,()=>{
        console.log(`Server is running on port : ${process.env.PORT}`)
    })
})
.then()
.catch((err)=>{
    console.log("MongoDB connection failed",err);
})