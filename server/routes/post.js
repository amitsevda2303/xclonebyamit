import express from "express"
import { savePost } from "../controller/post.js";

const router = express.Router();

try {
    router.post("/",savePost)
} catch (error) {
    console.log("Intrenal server error at auth route 🔴 ", error);
}    
export default router; 