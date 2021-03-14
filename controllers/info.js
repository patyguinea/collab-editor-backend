export default function getInfo(req, res) {
  res.status(200).json({
    ok: true,
    author: {
      email: 'patyguinea23@gmail.com',
      name: 'Paty Guinea',
    },
    frontend: {
      url: 'https://collab-editor-frontend.herokuapp.com/home',
    },
    language: 'node.js',
    sources: 'string, the url of a github repository including your backend sources and your frontend sources',
    answers: {
      1: "I started out by setting up the backend. I decided on a MongoDB, NodeJS, Express tech stack because it's what I'm most familiar with. Afterward, I focused on the frontend, which is built in React and uses React Hooks and Material UI for styling. Finally, I worked on the OT algorithm.",
      2: `If I had more time I would have focused more on the algorithm rather than getting everything else done. Algorithm's are not my strong suit and I wanted to get as much as possible done so I left it until the end and ran out of time.
      I would've liked to add a login portion, more tests, error handling, custom styling themes, and improve the UX.`,
      3: '',
    },
  });
}
