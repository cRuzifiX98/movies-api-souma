const express = require('express');
const movies = require('../models/movies');

const router = express.Router();

router.get('/', async (req, res) => {
  const response = await movies.allMovies();
  res.send(response);
});

router.get('/', (req, res) => {
  res.send('helllo');
});

// router.get('/:id') 
// router.post('/')
// router.put('/:movieId')
module.exports = router;
