export default async (_, {input}, {models}) => {
  return await models.PostModel
    .find(input)
    .populate('author')
    .populate('comments')
}
