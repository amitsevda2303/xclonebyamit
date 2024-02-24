import express from "express"
import { savePost } from "../controller/post.js";
import { showPost } from "../controller/post.js";

const router = express.Router();

try {
    router.post("/post",savePost)
    router.get("/getpost", showPost)
} catch (error) {
    console.log("Intrenal server error at auth route 🔴 ", error);
}    
export default router; 