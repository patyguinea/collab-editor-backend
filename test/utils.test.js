const { toClient } = require('../utils');

const MONGO_CONVO = { _id: '12345678', text: 'what', author: 'paty' };
const MONGO_CONVOS = [MONGO_CONVO];
const CLIENT_CONVO = { id: '12345678', text: 'what', author: 'paty' };
const CLIENT_CONVOS = [CLIENT_CONVO];

test('replaces _id with id', () => {
  expect(toClient(MONGO_CONVO)).toStrictEqual(CLIENT_CONVO);
});

test('replaces _id with id in each object of the array', () => {
  expect(toClient(MONGO_CONVOS)).toStrictEqual(CLIENT_CONVOS);
});

test('returns conversation as is', () => {
  expect(toClient(CLIENT_CONVO)).toStrictEqual(CLIENT_CONVO);
});
