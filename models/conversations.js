const { ObjectID } = require('mongodb');

const IDENTITY = 'conversations';

module.exports = {
  connection: 'ces',
  identity: IDENTITY,
  methods: db => {
    const collection = db.collection(IDENTITY);
    return {
      getConversations: () => collection.find({}).toArray(),
      getOneConversation: id => collection.findOne({ _id: new ObjectID(id) }),
      findOneAndUpdate: (id, text, lastMutation) =>
        collection.findOneAndUpdate({ _id: new ObjectID(id) }, { $set: { text, lastMutation } }),
      deleteOne: id => collection.deleteOne({ _id: new ObjectID(id) }),
      insertOne: conversation => collection.insertOne(conversation),
    };
  },
};
