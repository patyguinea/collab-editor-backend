const { getInfo } = require('../controllers/info');

module.exports = [
  {
    path: '/info',
    method: 'GET',
    controller: getInfo,
  },
];
