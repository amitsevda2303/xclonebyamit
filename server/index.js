
import express from "express"
import cors from "cors";
import dotenv from "dotenv"
import connectToMongo from "./config/dbConfig.js"
import userRouter from "./routes/auth.js"
import server from "./routes/SampleGQL.js"
import {expressMiddleware} from "@apollo/server/express4"
import { authMiddleware } from "./middleware/authMiddleware.js";

dotenv.config()

const startServer = async() =>{
    await connectToMongo()
    
    const app = express()
    app.use(cors());


    app.use(express.json());

    app.use("/graphql", expressMiddleware(server))
    app.use("/auth", userRouter);

    app.get('/', (req, res) => res.send('Hello World!'))
    app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}`))    
}

startServer();