function cors(req, res, next) {
  const {
    headers: { origin },
  } = req;
  const allowedOrigins = [
    'http://localhost:3001',
    'http://localhost:3002',
    'https://app.ava.me',
    'https://collab-editor-frontend.herokuapp.com',
  ];
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
}

module.exports = cors;
