import mongoose from 'mongoose'
import {Schema} from 'mongoose'
import {PostModel} from './post'
import {CommentModel} from './comment'

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: false
  },
  surname: {
    type: String,
    required: false,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: false
  },
  image: {
    type: String,
    required: false,
    trim: true
  }
})

userSchema.pre('deleteOne', async function (next) {
  const id = this.getQuery()["_id"]
  // PostModel.deleteMany({author: id}).then(() => next())
  await PostModel.deleteMany({author: id})
  await CommentModel.deleteMany({author: id})
  next()
})

export const UserModel = mongoose.model('User', userSchema)
