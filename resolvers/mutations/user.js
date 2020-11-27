import {ApolloError} from 'apollo-server-express'
import {createWriteStream, unlinkSync, existsSync} from 'fs'
import {v4} from 'uuid'
import path from 'path'
import config from 'config'

const uploadImage = async (file) => {
  const {createReadStream, mimetype, filename} = await file;

  if (mimetype === "image/png" ||
    mimetype === "image/jpg" ||
    mimetype === "image/jpeg") {

    const stream = createReadStream()
    const {ext} = path.parse(filename)
    const fname = v4() + ext
    const pathName = path.join(__dirname, `../../public/images/${fname}`)

    await stream.pipe(createWriteStream(pathName))

    const baseUrl = config.get('BASE_URL')
    return `${baseUrl}/images/${fname}`
  }
  return false
}

const createUser = async (_, { file, input }, {models}) => {
  try {
    if (file) {
      const url = await uploadImage(file)
      if (url) {
        input.image = url
      }
    }

    return await models.UserModel.create(input)
  } catch (e) {
    throw new ApolloError(e)
  }
}

const updateUser = async (_, {idUser, file, input}, {models}) => {
  try {
    const userToUpdate = await models.UserModel.findOne({_id: idUser})

    if (file) {
      if (userToUpdate.image) {
        const baseUrl = config.get('BASE_URL')
        const filename = userToUpdate.image.replace(`${baseUrl}/images/`, '')
        const pathName = path.join(__dirname, `../../public/images/${filename}`)

        if (existsSync(pathName)) {
          unlinkSync(path.join(__dirname, `../../public/images/${filename}`))
        }
      }
      const url = await uploadImage(file)

      if (url) {
        userToUpdate.image = url
      }
    }

    if (input) {
      Object.keys(input).forEach(val => {
        userToUpdate[val] = input[val]
      })
    }

    return await userToUpdate.save()
  } catch (e) {
    throw new ApolloError(e)
  }
}

const deleteUser = async (_, {idUser}, {models}) => {
  try {
    let userToDelete = await models.UserModel.findOne({_id: idUser})

    if (userToDelete.image) {
      const baseUrl = config.get('BASE_URL')
      const filename = userToDelete.image.replace(`${baseUrl}/images/`, '')
      const pathName = path.join(__dirname, `../../public/images/${filename}`)
      if (existsSync(pathName)) {
        unlinkSync(pathName)
      }
    }

    userToDelete = await models.UserModel.deleteOne({_id: idUser})
    return !!userToDelete.deletedCount;
  } catch (e) {
    throw new ApolloError(e)
  }
}

export const userMutations = {
  createUser,
  updateUser,
  deleteUser
}
