import mongoose from "mongoose"
import { Schema } from "mongoose"
import User from "./User.js";


const PostSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId, 
        ref: "User"
    },
    
    posts: [{
        title: String,
        images:[],
        description:[],
        location: String,
        replies:[],
        like:[],
        dislike: [],
        comment: [],      
    }],
   

})

const Post = mongoose.model("Post",PostSchema)
export default Post;