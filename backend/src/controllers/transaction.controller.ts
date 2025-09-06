import { type Request, type Response } from "express";
import Transaction, { type ITransaction } from "../models/transaction.model.js";

// handle the format errors

const handleServerError = (res: Response, error: unknown) => {
  console.log(error);
  res.status(500).json({ message: "Internal server Errro", error });
};

// get all transaction

export const getTransaction = async(req: Request, res: Response) => {
  try {
    const userId = req.userId;  // getting user id from authenticate middlware

    if(!userId){
        return res.status(403).json({
            message: "User is not authenticated"
        })
    }

    const transaction = await Transaction.find({userId}).sort({ date:-1});
    res.status(200).json(transaction);
  } catch (error) {
    handleServerError(res,error);
  }
};


// add transaction
export const addTransaction = async(req:Request, res:Response)=>{
    try{

        const userId = req.userId;

        if(!userId){
            return res.status(401).json({
                message: "User is not authenticated"
            })
        }

        const {amount,type,category, date, description,} = req.body;

        if(!amount || !type || !category || !date){
            return res.status(400).json({
                message: "Please provide all required fields : amount,type,category and date"
            })
        }

        const newTransaction: ITransaction  = new Transaction({
            amount,
            type,
            category,
            date,
            description,
            userId,  
        })

        const savedTransaction = await newTransaction.save();
        res.status(201).json([
            savedTransaction
        ])
    }catch(error){
  handleServerError(res, error);
    }
}

// update transaction

export const updateTransaction = async(req:Request, res:Response)=>{
    try{
        const {id } = req.params;
        const userId = req.userId;

        const transaction = await Transaction.findById(id);

        if(!transaction){
            return res.status(404).json({
                message: "Transaction not found"
            })
        }

        // ensure transaction belongs to authenticated user
        if(transaction.userId !== userId){
            return res.status(403).json({
                message: 'Unauthorized access to transaction'
            })
        }

        const updateTransaction = await Transaction.findByIdAndUpdate(id, req.body,{new: true});
        res.status(200).json(updateTransaction)

    }catch(error){
         handleServerError(res, error);
    }
}

// delete

export const deleteTransaction = async (req:Request,res:Response)=>{
    try{
        const {id} = req.params;
        const userId = req.userId;

        const transaction = await Transaction.findById(id);

        if(!transaction){
            return res.status(404).json({
                message: "Transaction not found"
            });
        }
// Ensure the transaction belongs to the authenticated user
   if (transaction.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized access to transaction' });
    }

    await Transaction.findByIdAndDelete(id);
    res.status(200).json({ message: 'Transaction deleted successfully' });
    }catch(error){

    }
}

