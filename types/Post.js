import {gql} from 'apollo-server-express'

export const PostType =  gql`
  scalar Date
  
  type Post {
    id: ID!
    author: User!
    title: String!
    text: String!
    date: Date!
  }
  
  input getPosts {
    _id: ID
    author: ID
    title: String
    date: Date!
  }

  extend type Query {
    posts(input: getPosts): [Post]
  }

  input CreatePostInput {
    author: ID!,
    title: String!
    text: String!
  }

  input UpdatePostInput {
    title: String
    text: String
  }

  extend type Mutation {
    createPost(input: CreatePostInput): Post!
    updatePost(idUser: ID!, idPost: ID!, input: UpdatePostInput): Post!
    deletePost(idUser: ID!, idPost: ID!): Boolean!
  }
`
