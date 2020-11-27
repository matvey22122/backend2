import {gql} from 'apollo-server-express'
import {UserType} from './User'
import {PostType} from './Post'
import {CommentType} from './Comment'

const defaultQuery = gql`
  type Query{
    _empty: String
  }
`

const defaultMutation = gql`
  type Mutation {
    _empty: String
  }
`

export const typeDefs =  [
  defaultQuery,
  defaultMutation,
  UserType,
  PostType,
  CommentType
]
