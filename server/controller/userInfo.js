import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User.js"

dotenv.config();

export const saveProfileInfo = async (req, res) => {
    try {
        const { pfp, banner } = req.body; // Extract pfp and banner URLs from request bodyE
        const token = req.headers.authorization; // Extract token from request headers

        if (!token) {
            return res.status(401).json({ message: "Token not provided" });
        }

        // Remove 'Bearer ' prefix from token string

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWTSECERET);
        const userId = decoded._id;

        // Get user details from the database using the decoded user ID
        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: "User not found" });
        }

        if (banner === null) {
             user.banner = null           
        }
        if (pfp != null) {
            user.pfp = pfp;            
        }
        user.banner = banner;

        await user.save();

        res.status(200).json({ message: "Profile info updated successfully" });

    } catch (error) {
        console.log(error);
    }

}