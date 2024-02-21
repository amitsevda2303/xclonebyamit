import mongoose from "mongoose"
import { Schema } from "mongoose"
import User from "./User";

const PostSchema = new Schema({
    userId:{
        ref:User
    },
    title:{
        type: String,
    },
    posts:[Schema.Types.Mixed],
    tags:{
        type: Array,
    },
    description:{
        type: String,
    },
    reply:{
        type:String,
        default: "Everyone"
    },
    location:{
        type:String
    },
    poll:{
        type:String
    },
    like:{
        type:Array
    },
    dislike:{
        type:Array
    }

})

const Post = mongoose.model("Post",PostSchema)
export default Post;