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
    banner:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVSFvB0ZOLn2_H6XVy208d25568wbeLMCwBg&usqp=CAU",
    },
    pfp:{
        type:String,
        default:"https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png",
    },
    location:{
        type:String,
        required:true
    },
    website:{
        type:String,
        required:true
    },
   
}, { timestamps: true })

const User = mongoose.model("User",UserSChema)
export default User;