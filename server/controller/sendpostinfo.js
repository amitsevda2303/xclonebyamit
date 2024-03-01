import jwt from "jsonwebtoken";
import Post from "../models/Post.js";

const SECERET = process.env.JWTSECERET;

export const getPostResolver = async (_, req) => {
    try {
        const { token , id } = req;
        const decoded = jwt.verify(token, SECERET);
        if (!decoded) {
            throw new Error('Invalid token');
        }
        const post = await Post.findOne({ userId: id});
        if (!post) {
            throw new Error('User not found');
        }
        return post;

    } catch (error) {
        console.log(error)
        throw new Error("Unable to fetch posts");
    }

}