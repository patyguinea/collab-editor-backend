const Joi = require('joi');
const { mutate } = require('../controllers/mutations');

const VALID_AUTHORS = ['alice', 'bob'];
const VALID_MUTATION_TYPES = ['insert', 'delete'];

module.exports = [
  {
    path: '/mutations',
    method: 'POST',
    validators: {
      body: Joi.object({
        author: Joi.string()
          .valid(...VALID_AUTHORS)
          .required(),
        conversationId: Joi.string().required(),
        data: {
          index: Joi.number().required(),
          length: Joi.number(),
          text: Joi.string(),
          type: Joi.string()
            .valid(...VALID_MUTATION_TYPES)
            .required(),
        },
        origin: {
          alice: Joi.number().integer().required(),
          bob: Joi.number().integer().required(),
        },
      }),
    },
    controller: mutate,
  },
];
