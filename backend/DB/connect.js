import mongoose from "mongoose";

export const connectDB = async () =>{
    try{
       const connector = await mongoose.connect(process.env.MONGO_URI)
       console.log(connector.connection.host)
    }catch(error){
        console.log(`error from deb connect ${error.message}`)
        process.exit(1)// meaning failure
    }
} 