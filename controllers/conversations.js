const { toClient } = require('../utils');

const addOneConversation = (req, res, next) => {
  const {
    collections: { conversations },
    body,
  } = req;
  return conversations
    .insertOne(body)
    .then(() => {
      res.status(200).json({
        ok: true,
      });
    })
    .catch(next);
};

const getConversations = (req, res, next) =>
  req.collections.conversations
    .getConversations()
    .then(conversations => {
      res.status(200).json({
        conversations: toClient(conversations),
        msg: 'Success',
        ok: true,
      });
    })
    .catch(err => {
      next(err);
    });

const deleteOneConversation = (req, res, next) => {
  const {
    collections: { conversations },
    body: { id },
  } = req;
  return conversations
    .deleteOne(id)
    .then(() => {
      res.status(204).json({
        ok: true,
      });
    })
    .catch(err => {
      next(err);
    });
};

module.exports = { addOneConversation, getConversations, deleteOneConversation };
