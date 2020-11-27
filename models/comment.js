import mongoose from 'mongoose'
import {Schema} from 'mongoose'

const commentSchema = new Schema({
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  },
  idPost: {
    type: Schema.ObjectId,
    ref: 'Post',
    required: true
  },
  parentComment: {
    type: Schema.ObjectId,
    ref: 'Comment',
    default: null
  },
  ancestors: [{
    _id: {
      type: Schema.ObjectId,
      ref: 'Comment',
      index: true
    },
  }]
})

export const CommentModel = mongoose.model('Comment', commentSchema)
