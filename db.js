import mongoose from 'mongoose'
import config from 'config'

const DATABASE_URL = config.get('mongoUri')

export const connectDb = () => {
  return mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  }, err => {
    if (err) {
      console.log("Connection to Database failed.");
    } else {
      console.log("Database connection successful.");
    }
  })
}

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));
