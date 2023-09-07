import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;

// You may use this as a boolean value for different situations
const env = {
  dev: process.env.NODE_ENV === 'dev',
  test: process.env.NODE_ENV === 'test',
  qa: process.env.NODE_ENV === 'qa',
  prod: process.env.NODE_ENV === 'prod',
};

export { port, env };