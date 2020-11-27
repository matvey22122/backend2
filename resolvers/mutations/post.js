import {ApolloError} from 'apollo-server-express'


const createPost = async (_, { input }, {models}) => {
  try {
    const post = await models.PostModel.create(input)
    return await post.populate('author').execPopulate()
  } catch (e) {
    throw new ApolloError(e)
  }
}

const updatePost = async (_, {idUser, idPost, input}, {models}) => {
  try {
    let postToUpdate = await models.PostModel.findOne({_id: idPost})

    if (postToUpdate.author.toString() !== idUser) {
      return new ApolloError('No access')
    }

    if (input) {
      postToUpdate = await models.PostModel.findOneAndUpdate({_id: idPost}, input)
      Object.keys(input).forEach(val => {
        postToUpdate[val] = input[val]
      })
    }

    return postToUpdate.populate('author').execPopulate()
  } catch (e) {
    throw new ApolloError(e)
  }
}

const deletePost = async (_, {idUser, idPost}, {models}) => {
  try {
    let postToDelete = await models.PostModel.findOne({_id: idPost})

    if (postToDelete.author.toString() !== idUser) {
      return new ApolloError('No access')
    }

    postToDelete = await models.PostModel.deleteOne({_id: idPost})
    return !!postToDelete.deletedCount;
  } catch (e) {
    throw new ApolloError(e)
  }
}

export const postMutations = {
  createPost,
  updatePost,
  deletePost
}
