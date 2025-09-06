import mongoose  from "mongoose";

const connectDb = async()=>{
    try{
       if (!process.env.MONGODB_URL){
            throw new Error("MONGODB URL is not defined");
        }

        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log(`MOGNGODB connected !! DB host !! ${connectionInstance.connection.host} `);
        
    }catch(error){
        console.log("MONGODB connecting error", error);
       process.exit(1); 
    }
}

export default connectDb