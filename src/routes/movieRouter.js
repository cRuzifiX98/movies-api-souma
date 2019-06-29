/* eslint-disable no-console */
const express = require('express');
const Joi = require('@hapi/joi');
const movies = require('../models/movies');
const validation = require('../utils/validation');

const router = express.Router();

// Manage entire collection of movies resource
router.get('/', async (req, res) => {
  const response = await movies.getAllMovies();
  res.send(response);
});

router.post('/', async (req, res) => {
  const result = Joi.validate(req.body, validation.moviesPostSchema);
  if (result.error) res.status(400).send(result.error.details[0].message);
  else {
    const response = await movies.addNewMovie(req.body);
    res.send(response);
  }
});

// Manage single movie resource
router.get('/:movieId', async (req, res) => {
  const response = await movies.getMovieById(req.params.movieId);
  if (response.length === 0) res.status(404).send('The Movie with the given Id was not found');
  else res.send(response);
});

router.put('/:movieId', async (req, res) => {
  const result = Joi.validate(req.body, validation.moviesPutSchema);
  if (result.error) res.status(400).send(result.error.details[0].message);
  else {
    const response = await movies.updateMovieById(req.params.movieId, req.body);
    res.send(response);
  }
});

router.delete('/:movieId', async (req, res) => {
  const response = await movies.deleteMovieById(req.params.movieId, req.body);
  res.send(response);
});

module.exports = router;
