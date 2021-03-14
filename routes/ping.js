module.exports = [
  {
    path: '/ping',
    method: 'GET',
    controller: (req, res) => {
      res.status(200).json({
        ok: true,
        msg: 'pong',
      });
    },
  },
];
