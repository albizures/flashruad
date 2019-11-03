import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import { getMetadataStorage } from 'type-graphql/dist/metadata/getMetadataStorage';
import WordResolver from '../entities/word/word.resolver';
import UserResolver from '../entities/user/user.resolver';
import PronunciationResolver from '../entities/pronunciation/pronunciation.resolver';

let schema: GraphQLSchema;
const createSchema = async () => {
  if (!schema) {
    if (process.env.NODE_ENV === 'production') {
      schema = await buildSchema({
        resolvers: [WordResolver, UserResolver, PronunciationResolver],
      });
    } else {
      // I'm not proud of this code but it's the only way that I found to make
      // work type-graphql and nextjs together, and here some links:
      // https://github.com/zeit/next.js/issues/1109
      // https://github.com/MichalLytek/type-graphql/issues/138
      schema = await require('type-graphql').buildSchema({
        resolvers: [
          require('../entities/word/word.resolver').default,
          require('../entities/user/user.resolver').default,
          require('../entities/pronunciation/pronunciation.resolver').default,
        ],
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
