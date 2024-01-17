import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSChema = new Schema({
    user:{
        type: String,
        required: true,
    },
    mobile:{
        type:Number,
        required:true,
        default:null
    },
    email:{
        type:String,
        required:true,
        default:null
    },
    password:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
   
}, { timestamps: true })

const User = mongoose.model("User",UserSChema)
export default User;