import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User.js"
import Post from "../models/Post.js"

dotenv.config();

export const savePost = async (req, res) => {
    try {
        const { title, post, description, location } = req.body;
        const token = req.headers.authorization;
        const seceret = process.env.JWTSECERET;        
        if (!token) {
            return res.status(401).json({ message: "Token not provided" });
        }

        const decoded = jwt.verify(token,seceret);
        
        const user = await User.findById(decoded._id);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: "User not found" });
        }
        
        let userPost = await Post.findOne({ userId: decoded._id });
        if (userPost) {
            userPost.posts.push({
                title: title,
                images: post,
                description: description,
                location: location,
                like: [],
                dislike: [],
                comment: [],
            });
        }else{
            // If user does not have a post, create a new one
            userPost = new Post({
                userId: decoded._id,
                posts: [{
                    title: title,
                    images: post,
                    description: description,
                    location: location,
                    like: [],
                    dislike: [],
                    comment: [],
                }]
            });
        } 
        userPost.save()
        res.status(200).json({ message: "uploded successfully" });

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Internal server error" });
    }
}