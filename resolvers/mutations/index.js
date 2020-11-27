import {userMutations} from './user'
import {postMutations} from './post'
import {commentMutations} from './comment'

export const mutations = {
  ...userMutations,
  ...postMutations,
  ...commentMutations
}
