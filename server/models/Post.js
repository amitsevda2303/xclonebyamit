import mongoose from "mongoose"
import { Schema } from "mongoose"

function getIndianTime() {
    const currentTime = new Date();
    const indianOffset = 5.5 * 60 * 60 * 1000; // Offset for Indian Standard Time (IST)
    const indianTime = new Date(currentTime.getTime() + indianOffset);
    return indianTime;
}

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
        createdAt: {
            type: Date,
            default: getIndianTime 
        }     
    }],
   

})

const Post = mongoose.model("Post",PostSchema)
export default Post;