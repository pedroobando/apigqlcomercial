const dotEnv = require('dotenv');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const connectDb = require('./mongodb/connectdb');
const _typeDefs = require('./graphql/schema');
const _resolvers = require('./graphql/resolver');
const { verifyToken } = require('./utils');

dotEnv.config({ path: '.env.development' });
// Conection Db
connectDb();

// CORS configuration
const corsOptions = {
  origin: process.env.ORIGIN_URI,
  credentials: true,
};

const startApolloServer = async (typeDefs, resolvers) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      let isAuthenticated = false;
      let payload = { sub: null };
      try {
        const authHeader = req.headers.authorization || '';
        if (authHeader) {
          const token = authHeader.split(' ')[1];
          payload = await verifyToken(token);
          isAuthenticated = payload ? true : false;
        }
      } catch (error) {
        return { req, auth: { isAuthenticated, uid: 0 } };
      }
      return {
        req,
        auth: {
          isAuthenticated,
          uid: payload.uid,
          displayName: payload.displayName,
          email: payload.email,
        },
      };
    },
  });
  await server.start();
  const app = express();

  server.applyMiddleware({ app, cors: corsOptions });
  // server.applyMiddleware({ app, cors: true });
  server.applyMiddleware({ app, path: '/' });

  const port = process.env.PORT || 4000;
  await new Promise((resolve) => app.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  return { server, app };
};

startApolloServer(_typeDefs, _resolvers);
