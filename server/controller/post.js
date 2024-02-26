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

        const decoded = jwt.verify(token, seceret);

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
        } else {
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

export const showPost = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const seceret = process.env.JWTSECERET;
        if (!token) {
            return res.status(401).json({ message: "Token not provided" });
        }

        const decoded = jwt.verify(token, seceret);
        const user = await User.findById(decoded._id);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: "User not found" });
        } else {
       // Aggregate the posts collection
            const result = await Post.aggregate([
                // Unwind the posts array to separate documents
                { $unwind: "$posts" },
                { $unwind: "$userId" },
                // Sort documents by the createdAt field in descending order
                { $sort: { "posts.createdAt": -1 } },
                // Group them back into an array
                {
                    $group: {
                        _id: null,
                        allPosts: { $push: { $mergeObjects: ["$posts", { userId: "$userId" }] } }
                    }
                }
            ]);
            // Extract the allPosts array from the result
            const allPosts = result.length > 0 ? result[0].allPosts : [];
            
            // Sort all posts combined by their createdAt field
            allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            await Post.populate(allPosts, { path: 'userId', select: 'pfp , user ' });
            // Fetch the pfp (profile picture) for each user
    
            // Send the sorted allPosts array as a response
            res.json(allPosts);
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error' });
    }
}