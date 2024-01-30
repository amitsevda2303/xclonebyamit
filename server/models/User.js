import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSChema = new Schema({
    user:{
        type: String,
        required: true,
    },
    mobile:{
        type:Number,
        default:null
    },
    email:{
        type:String,
        default:null
    },
    password:{
        type:String,
        required:true
    },
    dob:{
        type:Object,
        required:true
    },
   
}, { timestamps: true })

const User = mongoose.model("User",UserSChema)
export default User;