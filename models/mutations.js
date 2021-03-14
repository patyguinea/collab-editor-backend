const IDENTITY = 'mutations';

module.exports = {
  connection: 'ces',
  identity: IDENTITY,
  methods: db => {
    const collection = db.collection(IDENTITY);
    return {
      insertOne: mutation => collection.insertOne(mutation),
    };
  },
};
