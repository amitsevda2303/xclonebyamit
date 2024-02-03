import jwt from "jsonwebtoken";
import User from "../models/User.js";

const SECERET = process.env.JWTSECERET;


const extractDateInfo = (date) => {
  return {
    date: date.getDate(),
    month: date.getMonth() + 1, // Adding 1 because months are zero-based
    year: date.getFullYear(),
  };
};


export const getDetailsResolver = async (_, req) => {
  try {
    const { token } = req;

    // Verify the token
    const decoded = jwt.verify(token, SECERET);

    // Get user details from the database using the decoded user ID
    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      throw new Error('User not found');
    }
    const dateInfo = extractDateInfo(user.createdAt);

    return {
      ...user.toObject(),
      createdAt: {
        date: dateInfo.date,
        month: dateInfo.month,
        year: dateInfo.year,
      },  
    };
  } catch (error) {
    console.log(error);
    throw new Error('Invalid token');
  }
};
