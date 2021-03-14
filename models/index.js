const { MongoClient } = require('mongodb');
const glob = require('glob');

const database = {
  ces: {
    development: process.env.ORMONGO_URL || 'mongodb://localhost:27017/ces',
  },
};

const collections = {};
const databases = {};

const getMongoConnectionString = connection => database[connection][process.env.NODE_ENV];

function bootCollections() {
  const files = glob.sync(`${__dirname}/*.js`).filter(file => !file.endsWith('index.js') && !file.endsWith('spec.js'));

  return Promise.all(
    files.map(file => {
      // eslint-disable-next-line
      const collection = require(file);

      const { identity, connection } = collection;
      if (!identity || !connection) return Promise.resolve();

      if (!databases[connection]) {
        const connectionString = getMongoConnectionString(connection);

        databases[connection] = MongoClient.connect(connectionString, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        });
      }

      return databases[connection].then(client => {
        const db = client.db();
        collections[identity] = collection.methods(db);
        return collection;
      });
    })
  );
}

async function loadCollections() {
  await bootCollections();
  return collections;
}

async function middleware(req, res, next) {
  req.collections = collections;
  next();
}

module.exports = { loadCollections, middleware };
