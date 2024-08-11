import dotenv from 'dotenv';
import connectDB from "./db/index.js";

// Load environment variables from .env file
dotenv.config({ path: './env' });

// Debugging: Log the MONGO_URI to verify it's being loaded correctly
console.log("MONGO_URI from .env file:", process.env.MONGO_URI);

// Connect to MongoDB
connectDB();





// import express from "express";
// const app=express()
// (async()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log("err:",error);
//             throw error
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log(`App is lisenting on post ${process.env.PORT}`)
//         })
//     }catch(error){
//         console.error("Error while connecting to database :",error)
//         throw error
//     }
// })()