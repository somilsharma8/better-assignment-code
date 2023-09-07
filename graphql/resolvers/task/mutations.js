// import jwt from 'jsonwebtoken';

const taskMutations = {
  triggerTasks: async (_, args) => {
    console.log('Task triggered :::::: ', args);
    return [1, 1];
  },
  login: async (_, { email, password }) => {
    // Add find query to fetch user details from db
    // const user = await db.find({email: email, password: password});
    const { id, permissions, roles } = {
      id: 1,
      active: true,
      firstName: "Somil",
      lastName: "Sharma",
      role: "admin",
      mobile: '999999999',
      email: 'somilsharma8@gmail.com',
      permissions: [],
      roles: [],
    };
  },
};

export default taskMutations;
