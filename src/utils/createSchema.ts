import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import WordResolver from '../entities/word/word.resolver';
import { getMetadataStorage } from 'type-graphql/dist/metadata/getMetadataStorage';

let schema: GraphQLSchema;
const createSchema = async () => {
  if (!schema) {
    if (process.env.NODE_ENV === 'production') {
      schema = await buildSchema({
        resolvers: [WordResolver],
      });
    } else {
      // I'm not proud of this code but it's the only way that I found to make
      // work type-graphql and nextjs together, and here some source:
      // https://github.com/zeit/next.js/issues/1109
      // https://github.com/MichalLytek/type-graphql/issues/138

      schema = await require('type-graphql').buildSchema({
        resolvers: [require('../entities/word/word.resolver').default],
      });

      getMetadataStorage().clear();
      Object.keys(require.cache).forEach(function(id) {
        if (id.includes('type-graphql') || id.includes('/src/entities/')) {
          delete require.cache[id];
        }
      });
    }
  }

  return schema;
};

export default createSchema;
