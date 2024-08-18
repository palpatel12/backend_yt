import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js';


const registerUser=asyncHandler(async(req,res)=>{
    //1. get user details from user
    //2. validation-not empty
    //3. check if user already exists
    //4. check for images and check for complusory one
    //5. upload them to cloudinary
    //6. create user object- create entry in db
    //7. remove password and refresh token field from response
    //8. check for user creation
    //9. return res

    //1.
    const {fullName,email,username,password}=req.body
    console.log("email: ",email);

    //basic way
    // if(fullName===""){
    //     throw new ApiError(400,"fullname is required")
    // }
    if(
        [fullName,email,username,password].some((field)=>
            field?.trim()==="")
    ) {
        throw new ApiError(400,"All fields are required")
    }

    //to check if a user already exits or not
    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User already exists")
    }

    //to store file path (using option ? to avoid errors)
    //multer give files access
    const avatarLocalPath=req.files?.avatar[0]?.path
    console.log(req.files);
    //const coverImageLocalPath=req.files?.coverImage[0]?.path
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImageLocalPath=req.files.coverImage[0].path;
    }

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    //upload image to cloudinary
    const avatar=await uploadOnCloudinary(avatarLocalPath)
    const coverImage=await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }
    const user=await User.create({
        fullName,
        avatar:avatar.url,
        coverImage: coverImage?.url || "", //checking if it exists or not i.e corner case checking
        email,
        password,
        username: username.toLowerCase()
    })
    const createdUser = await User.findById(user._id).select(
        //likho ki kya kya nahi chaiye
        "~password ~refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"Error while registering new user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered succesfully")
    )
})

export {registerUser}