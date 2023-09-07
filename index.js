// Entry Point of the API Server
import cors from "cors";

import { port } from './config/environment/index.js';
import apolloServer from "./graphql/index.js";
import app from './app.js';

// app.get('/login', (req, res, next) => {
//     console.log("LOGIN TEST DATA :");
//     res.json({status: 200, message: 'Successfully logged in'});
// })

// // Create a Server and run it on the port 3000
// const server = app.listen(3500, () => {
//     let host = server.address().address
//     let port = server.address().port
//     // Starting the Server at the port 3500
//     console.log('Started the Server at the port 3500')
// })

const startServer = async () => {
    try {
        console.log('Connecting to database');
        // await connectDB();
        console.log('Connected to database');

        app.use(cors());
        await apolloServer.applyMiddleware({
            app,
        });

        await app.listen(port);
        console.log(`🚀  GraphQL server running at port: ${port}`);
    } catch (error) {
        console.log('Error while starting backend server ::::: ', error);
    }
};

startServer();