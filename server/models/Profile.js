import mongoose from "mongoose";
const { Schema } = mongoose;

const ProfileSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    banner:{
        type:String,
        default:null
    },
    pfp:{
        type:String,
        default:null
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

const Profile =  mongoose.model("Profile",ProfileSchema)
export default Profile;