/**
 * Map response from mongo to client friendly schema
 * @param {*} response
 * @returns {*}
 */
function toClient(response) {
  const { _id, ...rest } = response;

  if (Array.isArray(response)) {
    return response.map(item => toClient(item));
  }

  if (typeof response === 'object') {
    return _id ? { id: _id, ...rest } : rest;
  }

  return response;
}

function doSimpleDelete(mainText, index, length) {
  const array = mainText.split('');
  const cloneArray = [...array];
  cloneArray.splice(index, length);
  return `${cloneArray.join('')}`;
}

function doSimpleInsert(mainText, text, index, length) {
  return `${mainText.slice(0, index)}${text}${mainText.slice(index + length - 1)}`;
}

// OT TODO: finish and fix bugs
function getTransfomedText(lastMutation, mutation, mainText) {
  const {
    data: { index, length, text, type },
    author,
  } = mutation;
  const isCurrInsert = type === 'insert';
  if (!lastMutation) {
    if (!isCurrInsert) {
      return doSimpleDelete(mainText, index, length);
    }
    if (isCurrInsert) {
      return doSimpleInsert(mainText, text, index, length);
    }
  }

  const {
    data: { index: lastIndex, length: lastLength, text: lastText, type: lastType },
    author: lastAuthor,
  } = lastMutation;
  const isLastInsert = lastType === 'insert';
  if (lastAuthor === author) {
    if (!isCurrInsert) {
      return doSimpleDelete(mainText, index, length);
    }
    if (isCurrInsert) {
      return doSimpleInsert(mainText, text, index, length);
    }
  }

  if (lastAuthor !== author) {
    if (isLastInsert && isCurrInsert) {
      if (lastIndex < index || lastIndex === index) {
        const newText = `${mainText.slice(0, lastIndex)}${lastText}${mainText.slice(lastIndex)}`;
        // increase current operation offset
        const newIndex = index + lastLength;
        return `${newText.slice(0, newIndex)}${text}${newText.slice(newIndex)}`;
      }
    }
    // TODO !isLastinsert && isCurrInsert
    // TODO isLastInsert && !isCurrInsert
    // TODO !isLastInsert && !isCurrInsert
  }

  return mainText;
}

module.exports = { toClient, getTransfomedText };
