export default async (_, {input}, {models}) => {
  return await models.CommentModel
    .find(input)
    .populate('author')
    .populate('ancestors')
}
