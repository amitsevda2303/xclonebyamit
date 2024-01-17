import mongoose from "mongoose";
import dotenv from "dotenv"


dotenv.config()
const connectToMongo  = async() =>{
    try {
        await mongoose.connect(process.env.MONGOURI)
        console.log('Connected Successfully 🟢')
    } catch (error) {
        console.log('unable to load 🔴',error)
    }
}


export default connectToMongo;