const Joi = require('joi');
const { getConversations, deleteOneConversation, addOneConversation } = require('../controllers/conversations');

module.exports = [
  {
    path: '/conversations',
    method: 'POST',
    validators: {
      body: Joi.object({
        text: Joi.string().required(),
        author: Joi.string().required(),
      }),
    },
    controller: addOneConversation,
  },
  {
    path: '/conversations',
    method: 'GET',
    controller: getConversations,
  },
  {
    path: '/conversations',
    method: 'DELETE',
    controller: deleteOneConversation,
  },
];
