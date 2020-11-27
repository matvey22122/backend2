export default async (_, {input}, {models}) => {
  return await models.UserModel.find(input)
}
