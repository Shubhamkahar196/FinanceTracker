import mongoose, { Schema ,model} from "mongoose";

export interface IUser extends Document{
    email: string;
    password?: string;
}

const userSchema = new Schema<IUser>({
    email: {
        type:String,
        required: [true,'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
          match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    password:{
        type:String,
        requied: [true,"password is required"],
        minLength: [6, 'Password must be at least 6 characters long']
    }
},{
    timestamps: true,
})

const User = model<IUser>('User', userSchema);

export default User;