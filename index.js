import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import config from 'config'
import {connectDb} from './db'
import {typeDefs} from './types'
import {resolvers} from './resolvers'
import {models} from './models'
import path from 'path'

connectDb()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {models}
});

const app = express();
app.use('/images', express.static(path.join(__dirname, 'public/images')))
server.applyMiddleware({ app });

const port = config.get('PORT')

app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
