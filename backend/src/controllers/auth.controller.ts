


import express, { type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

import User from "../models/user.model.js";

interface AuthRequest extends Request {
  body: {
    name?: string;
    email: string;
    password: string;
  };
}

const handleServerError = (res: Response, error: unknown) => {
  console.error(error); // Use console.error for better logging
  res.status(500).json({ message: 'Internal Server Error', error });
};


export const signup = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, password } = req.body;
    
  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user with the hashed password
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();
    
    // Generate a JWT
    const token = jwt.sign(
      { userId: savedUser._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );
    
    res.status(201).json({
      message: "User registered successfully",
      token,
      userId: savedUser._id,
    });
  } catch (error) {
    handleServerError(res, error);
  }
};


export const signin = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    

    if (!user.password) {
      
      return res.status(500).json({ message: "Password not found for user" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    // Generate a new JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );
    
    res.status(200).json({
      message: "Logged in successfully",
      token,
      userId: user._id,
      name: user.name,
    });
  } catch (error) {
    handleServerError(res, error);
  }
};