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
        images:{
            type:Array,
            default: []
        },
        description:[],
        location: String,
        replies:{
            type:Array,
            default: []
        },
        like:{
            type:Array,
            default: []
        },
        dislike: {
            type:Array,
            default: []
        },
        Comment: {
            type:Array,
            default: []
        }, 
        timestamp: {
            type: Date,
          },          
    }],
   

})

const Post = mongoose.model("Post",PostSchema)
export default Post;