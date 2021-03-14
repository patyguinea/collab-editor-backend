const { getTransfomedText } = require('../utils');

const sendResult = (res, text) => {
  const result = {
    text,
    ok: true,
  };
  if (!text) result.msg = 'Could not find conversation.';
  res.status(201).json(result);
};

const mutate = async (req, res) => {
  const {
    body,
    collections: { mutations, conversations },
  } = req;

  const matchingConversation = await conversations.getOneConversation(body.conversationId);
  if (!matchingConversation) return sendResult(res);

  const { lastMutation } = matchingConversation;

  const transformedText = getTransfomedText(lastMutation, body, matchingConversation.text);
  // add mutation and update lastMutation in conversation
  await Promise.all([
    mutations.insertOne(body),
    conversations.findOneAndUpdate(body.conversationId, transformedText, body),
  ]);

  return sendResult(res, transformedText);
};

module.exports = { mutate };
