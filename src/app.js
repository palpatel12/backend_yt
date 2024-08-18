import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))


//ways to get data
//normal json get data
app.use(express.json({limit:"16kb"}))
//to get data from url
app.use(express.urlencoded({extended:true,limit:"16kb"}))
//to store and get sttic things likes file
app.use(express.static("public"))
//get data using secure cookies
app.use(cookieParser())

//routes
import userRouter from './routes/user.routes.js'

//routes declaration
app.use("/api/v1/users",userRouter)
//this will look like: http://localhost:8000/api/v1/users  : /register or /login
export {app}