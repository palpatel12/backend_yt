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


export {app}