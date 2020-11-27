import mongoose from 'mongoose'
import {Schema} from 'mongoose'
import {CommentModel} from './comment'

const postSchema = new Schema({
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

postSchema.pre('deleteOne', async function (next) {
  const id = this.getQuery()["_id"]
  await CommentModel.deleteMany({idPost: id})
  next()
})

export const PostModel = mongoose.model('Post', postSchema)
