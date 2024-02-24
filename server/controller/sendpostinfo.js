import jwt from "jsonwebtoken";
import Post from "../models/Post.js";
import User from "../models/User.js";

const SECERET = process.env.JWTSECERET;

export const getPostResolver = async (_, req) => {
    try {
        const { token } = req;
        const decoded = jwt.verify(token, SECERET);

        const post = await Post.findOne({userId: decoded._id});
        if (!post) {
            throw new Error('User not found');
        }
        return post;

    } catch (error) {

    }

}