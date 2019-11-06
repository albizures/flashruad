import { createConnection as create, getConnectionManager } from 'typeorm';
import { Word } from '../entities/word/word.entity';
import { User } from '../entities/user/user.entity';
import { Language } from '../entities/language/language.entity';
import { Pronunciation } from '../entities/pronunciation/pronunciation.entity';
import { Noun } from '../entities/noun/noun.entity';

const createConnection = async () => {
  const connectionManager = getConnectionManager();

  if (connectionManager.has('default')) {
    return connectionManager.get('default');
  }

  const connection = await create({
    name: 'default',
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'r00t',
    database: process.env.DB_NAME || 'flashcards',
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV !== 'production',
    entities: [Word, User, Pronunciation, Language, Noun],
  });

  return connection;
};

export default createConnection;
