// do not make changes to this file
const router = require('express').Router();
const jokes = require('./jokes-data');
// restricted not needed here as it's on the server.js path

router.get('/', (req, res) => {
  res.status(200).json(jokes);
});

module.exports = router;
