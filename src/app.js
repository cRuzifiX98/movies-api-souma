/* eslint-disable no-console */
const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to movies API!!');
});

app.use('/api/movies', require('./routes/movieRouter'));

// To manage the entire collection of movie resource
app.get('/api/movies', async (req, res) => {
  const response = await movies.allMovies();
  res.send(response);
});
// app.post('/api/movies', async (req, res) => {

// })

// To manage a single movie resource
app.get('/api/movies/:movieId', async (req, res) => {
  const response = await movies.movieById(req.params.movieId);
  if (response.length === 0) res.status(404).send('The Movie with the given Id was not found');
  else res.send(response);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));

// validation import 
// movieRoute import
// directorRouter import
// app.use('/', movieRouter);
// app.use('/', directorRouter);
