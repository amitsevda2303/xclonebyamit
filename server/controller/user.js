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
    throw new Error('Invalid token');
  }
};


export const getOneResolver = async (_, req) => {
  try {
    const { token, id } = req;
    const _id = id
    const SECERET = process.env.JWTSECERET; // Assuming you have defined JWT_SECRET in your environment variables

    // Check if token is provided
    if (!token) {
      throw new Error("Token must be provided");
    }

    // Verify the token
    const decoded = jwt.verify(token, SECERET);

    // Check if the token is valid
    if (!decoded) {
      throw new Error("Invalid Token");
    } else {
      // If token is valid, find the user by ID
      const user = await User.findById(_id).select("-password");

      // Check if user exists
      if (!user) {
        throw new Error("User not found");
      }

      // Extract date information
      const dateInfo = extractDateInfo(user.createdAt);

      // Return user data with formatted createdAt
      return {
        ...user.toObject(),
        createdAt: {
          date: dateInfo.date,
          month: dateInfo.month,
          year: dateInfo.year,
        },
      };
    }
  } catch (error) {
    console.log(error);
    throw new Error("Invalid token");
  }
};
