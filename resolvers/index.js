import {mutations} from './mutations'
import {queries} from './queries'

export const resolvers = {
  Mutation: {
    ...mutations
  },
  Query: {
    ...queries
  }
}
