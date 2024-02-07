import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import { validationResult } from "express-validator"

dotenv.config();

export const createUser = async (req, res) => {
    try {
        const { user, mobile, email, password, dob } = req.body;
        const isValidEmail = (email) => {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return regex.test(email);
          };
          const phoneRegex = /^[0-9]{10}$/;
          if (!isValidEmail(email) && !phoneRegex.test(mobile)) {
            return res
              .status(400)
              .json({ error: "Either email or mobile number is required" });
          }
      
        //checking validation result
        const result = validationResult(req);
        if (!result.isEmpty()) return res.send({ errors: result.array() });

        const condition1 = email && await User.findOne({ email: email })
        const condition2 = mobile && await User.findOne({ mobile: mobile })

        if (condition1 || condition2) {
            return res.status(409).json({ success:false, error: 'User already exists'});
        }

        //Hashing password
        const hasedPassword = await bcrypt.hash(password, 10)

        if (email && !mobile) {
           
            const newUser = await User({
                email: email,
                user: user,
                password: hasedPassword,
                dob: dob
            })
            await newUser.save()
            const userPayload = {
                _id: newUser._id,
            }
            const authToken = jwt.sign(userPayload, process.env.JWTSECERET);
            return res.json({ authToken,res: "user Added successfully",success:true})
        }


        if (!email && mobile) {
           
            const newUser = await User({
                mobile: mobile,
                user: user,
                password: hasedPassword,
                dob: dob
            })
            await newUser.save()
            const userPayload = {
                _id: newUser._id,
            }
            const authToken = jwt.sign(userPayload,process.env.JWTSECERET);
            return res.json({authToken, res: "user Added successfully" , success:true})
        }
    } catch (error) {
        console.log("Intrenal server error at auth controller🔴 ", error);
    }
}



export const loginUser = async(req,res) =>{
try {
    const {content,password} = req.body;

     // Validate whether 'content' is an email or a mobile number
     const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(content);
     const isValidMobile = /^[0-9]{10}$/.test(content);

     if (!isValidEmail && !isValidMobile) {
        return res.status(400).json({ error: "Invalid email or mobile number format" });
    }

    let user;
    if (isValidEmail) {
        user = await User.findOne({ email: content });
    } else {
        user = await User.findOne({ mobile: content });
    }

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const userPayload = {
        _id: user._id,
    };
    const authToken = jwt.sign(userPayload, process.env.JWTSECERET);

    return res.json({ authToken, res: "Login successful", success: true });
    
} catch (error) {
    console.log("Internal server error at auth controller🔴 ", error);
    return res.status(500).json({ error: "Internal server error" });
}
}