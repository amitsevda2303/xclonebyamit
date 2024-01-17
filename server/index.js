
import express from "express"
import cors from "cors";
import dotenv from "dotenv"
import connectToMongo from "./config/dbConfig.js"
import userRouter from "./routes/auth.js"
dotenv.config()


const app = express()
app.use(cors());
app.use(express.json());
await connectToMongo()
app.use("/auth", userRouter);
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}`))