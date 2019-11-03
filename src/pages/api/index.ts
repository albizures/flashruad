import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import { RequestHandler } from 'micro';
import createSchema from '../../utils/createSchema';
import createConnection from '../../utils/createConnection';

export const config = {
  api: {
    bodyParser: false,
  },
};

let server: ApolloServer;

const bootstrap: RequestHandler = async (req, res) => {
  await createConnection();
  if (!server) {
    server = new ApolloServer({
      schema: await createSchema(),
    });
  }

  server.createHandler({ path: '/api' })(req, res);
};

export default bootstrap;
