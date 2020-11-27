import {gql} from 'apollo-server-express'

export const UserType =  gql`  
  type User {
    id: ID!
    name: String!
    surname: String
    email: String!
    image: String
  }
  
  input GetUsersInput {
    _id: ID
    name: String
    surname: String
    email: String
  }
  
  extend type Query {
    users(input: GetUsersInput): [User]
  }

  input CreateUserInput {
    name: String!
    surname: String
    email: String!
  }

  input UpdateUserInput {
    name: String
    surname: String
    email: String
  }
  
  extend type Mutation {
    createUser(file: Upload, input: CreateUserInput): User!
    updateUser(idUser: ID!, file: Upload, input: UpdateUserInput): User!
    deleteUser(idUser: ID!): Boolean!
  }
`
