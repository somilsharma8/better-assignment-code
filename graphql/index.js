import { ApolloServer } from 'apollo-server-express';
import { env } from '../config/environment/index.js';
import { default as Upload } from 'graphql-upload/Upload.mjs';

import schema from './schema.js';

const apolloServer = new ApolloServer({
  schema,
  playground: env.dev,
  context: ({req}) => {
    const user = req.user || null;
    return { user };
  }
});

// without this, apollo will throw an error.
await apolloServer.start();

export default apolloServer;