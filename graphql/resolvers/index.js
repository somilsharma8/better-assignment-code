import { taskQueries, taskMutations } from './task/index.js';

const resolvers = {
    Query: {
        ...taskQueries,
    },
    Mutation: {
        ...taskMutations,
    }
}

export default resolvers;