import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const gqlFiles = readdirSync(join(__dirname, './typedefs'));

let typeDefs = '';

gqlFiles.forEach((file) => {
  typeDefs += readFileSync(join(__dirname, './typedefs', file), {
    encoding: 'utf8',
  });
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;