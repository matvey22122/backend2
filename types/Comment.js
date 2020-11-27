import {gql} from 'apollo-server-express'

export const CommentType =  gql`  
  type Comment {
    id: ID!
    author: User!
    text: String!
    date: Date!
    idPost: ID!
    parentComment: ID
  }
  
  input GetCommentsInput {
    _id: ID
    author: ID
    text: String
    date: Date
    idPost: ID
    parentComment: ID
  }

  extend type Query {
    comments(input: GetCommentsInput): [Comment]
  }

  input CreateCommentInput {
    text: String!
  }

  input UpdateCommentInput {
    text: String!
  }

  extend type Mutation {
    createComment(idUser: ID!, idPost: ID!, idComment: ID, input: CreateCommentInput): Comment!
    updateComment(idUser: ID!, idComment: ID!, input: UpdateCommentInput): Comment!
    deleteComment(idUser: ID!, idComment: ID!): Boolean!
  }
`
