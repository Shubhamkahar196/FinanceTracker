import { Request,Response } from "express";
import bcrypt  from "bcryptjs";
import jwt from 'jsonwebtoken'
import User from "../models/user.model.js";

const handleServerError = (res: Response, error: unknown) =>{
    console.log(error);
    res.status(500).json({
        message: 'Internal server Error',error
    })
    
}

export const signup = async(req: Request, res: Response) =>{
  try{
    const {email, password} = req.body;

    const existingUser = await User.findOne({
        email
    })

    if(!existingUser){
      return res.status(409).json({
        message: 'User with this email already exists'
      })
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = new User({
        email,
        password: hashedPassword
    })

    const savedUser = await newUser.save();

    const token = jwt.sign(
        {
        userId: savedUser._id
    },
    process.env.JWT_SECRET as string,
    {
        expiresIn: '1d'
    }
)

res.status(201).json({
    message: "User registered succesfully",
    token,
    userId: savedUser._id,
})

  }catch(error){
   handleServerError(res,error);
  }
}


export const signin = async(req:Request,res:Response)=>{
    try{
        const{email,password} = req.body;

        const user = await User.findOne({
            email
        })

        if(!user){
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign(
            { userId: user._id},
            process.env.JWT_SECRET as string,
            {
                expiresIn: '1d'
            }
        )

        res.status(200).json({
            message: "Logged in successfully",
            token,
            userId: user._id
        })
    }catch(error){
      handleServerError(res,error);
    }
}