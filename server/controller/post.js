import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User.js"
import Post from "../models/Post.js"

dotenv.config();

export const savePost = async(req,res) =>{
    try {
        const { title , post , tags , description , location ,reply, poll} = req.body; 
        const token = req.headers.authorization

        if (!token) {
            return res.status(401).json({ message: "Token not provided" });
        }

        const decoded = jwt.verify(token, process.env.JWTSECERET);
        const user = await User.findById(decoded._id);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: "User not found" });
        }

        const newPost = await Post({
            title: title,
            posts: [post],
            tags: tags,
            description : description,
            location: location,
            reply: reply,
            poll: poll
        })
        newPost.save()
        res.status(200).json({ message: "uploded successfully" });

    } catch (error) {
        res.status(400).json({ message: "Internal server error" });
    }
}