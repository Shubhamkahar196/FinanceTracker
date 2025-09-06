import mongoose,{ Document } from "mongoose";

export interface ITransaction extends Document{
    amount: number;
    type: 'income' | 'expense';
    category: string;
    date: Date;
    description?: string;
    userId: string;
}

const transactionSchema = new mongoose.Schema<ITransaction>({
   amount: {
    type: Number,
    required: [true, 'Amount is required'],
   },
   type: {
    type: String,
    enum: ['income ', 'expense'],
    required: [true, 'Type is required']
   },
   category:{
    type:String,
    required: [true, 'Category is required']
   },
   date:{
    type:Date,
    required:[true,'Date is required'],
   },
   description:{
     type:String,
   },
   userId:{
     type:String,
    required:[true,'UserId is required'],
   }
},{
    timestamps: true
})

const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction