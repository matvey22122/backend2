import {ApolloError} from 'apollo-server-express'


const buildAncestors = async (id, parentCommentId, models) => {
  let parent_comment = await models.CommentModel.findOne({ "_id": parentCommentId });
  if ( parent_comment ) {
    const { _id } = parent_comment;
    const ancest = [...parent_comment.ancestors];
    ancest.unshift({ _id })
    return await models.CommentModel.findByIdAndUpdate(id, { $set: { "ancestors": ancest } });
  }
  return null
}

const createComment = async (_, { idUser, idPost, idComment=null, input }, {models}) => {
  try {
    const newComment = await models.CommentModel.create({
      author: idUser,
      idPost: idPost,
      ...input,
      parentComment: idComment
    })

    return await buildAncestors(newComment._id, idComment, models) || newComment
  } catch (e) {
    throw new ApolloError(e)
  }
}

const updateComment = async (_, {idUser, idComment, input}, {models}) => {
  try {
    let comment = await models.CommentModel.findById(idComment)
    const post = await models.PostModel.findById(comment.idPost.toString())

    if (comment.author.toString() !== idUser && post.author.toString() !== idUser) {
      return new ApolloError('No access')
    }

    comment = await models.CommentModel.findOneAndUpdate({_id: idComment}, {text: input.text})
    comment.text = input.text
    return await comment.populate('author').execPopulate()
  } catch (e) {
    throw new ApolloError(e)
  }
}

const deleteComment = async (_, {idUser, idComment}, {models}) => {
  try {
    const comment = await models.CommentModel.findById(idComment)
    const post = await models.PostModel.findById(comment.idPost)

    if (comment.author.toString() !== idUser && post.author.toString() !== idUser) {
      return new ApolloError('No access')
    }

    await models.CommentModel.deleteMany({"ancestors._id": idComment})
    const commentToDelete = await models.CommentModel.deleteMany({_id: idComment})
    return !!commentToDelete.deletedCount;
  } catch (e) {
    throw new ApolloError(e)
  }
}

export const commentMutations = {
  createComment,
  updateComment,
  deleteComment
}
