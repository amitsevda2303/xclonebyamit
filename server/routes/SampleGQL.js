import { ApolloServer } from "@apollo/server"
import dotenv from "dotenv"
import { getDetailsResolver, getOneResolver } from "../controller/user.js";
import { getPostResolver } from "../controller/sendpostinfo.js";


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
      pfp: String
      banner: String
    }
    type DateInfo {
      date: String!
      month: String!
      year: String!
    }
    type Dob {
      month: String!
      day: String!
      year: String!
    }
type Post {
  _id: ID!
  userId: ID!
  posts: [PostDetails]!
}

type PostDetails {
  title: String
  images: [String]
  description: [String]
  location: String
  replies: [String]
  like: [String]
  dislike: [String]
  comment: [String]
  createdAt : String
}


type Query{
  getdetails(token:String!):User
  getPosts(token:String!, id: ID!):Post
  getOneUserData(token:String, id: ID!): User
 }
 `,
  resolvers: {
    Query: {
      getdetails: getDetailsResolver,
      getPosts: getPostResolver,
      getOneUserData: getOneResolver
    },
  },
})
await server.start();
export default server;