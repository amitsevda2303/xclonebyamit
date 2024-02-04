import {ApolloServer} from "@apollo/server"
import dotenv from "dotenv"
import { getDetailsResolver } from "../controller/user.js";


dotenv.config()
const server = new ApolloServer({
    typeDefs: `
    type User {
      _id: ID!
      user: String!
      mobile: String
      email: String
      dob: Dob!
      createdAt: DateInfo!
    }
    type DateInfo {
      date: Int!
      month: Int!
      year: Int!
    }
    type Dob {
      month: String!
      day: String!
      year: String!
    }
         type Query{
          getdetails(token:String!):User
         }
      `,
      resolvers: {
        Query: {
            getdetails:getDetailsResolver,
        },
      },
})
await server.start();
export default server;