module.exports = [
  {
    path: '/',
    method: 'GET',
    controller: (req, res) => {
      res.render('home', { title: 'Collaborative Editing System' });
    },
  },
];
