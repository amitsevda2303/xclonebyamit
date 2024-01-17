
import express from "express"
import dotenv from "dotenv"
import connectToMongo from "./config/dbConfig.js"
dotenv.config()

await connectToMongo()

const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})