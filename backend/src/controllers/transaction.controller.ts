import { Request,Response } from "express";
import Transaction, {ITransaction} from "../models/transaction.model.js";

// handle the format errors

const handleServerError = (res:Response, error: unknown)=>{
    console.log(error);
    res.status(500).json({message: "Internal server Errro",error});
    
}


// get all transaction

export const getTransaction = (res)