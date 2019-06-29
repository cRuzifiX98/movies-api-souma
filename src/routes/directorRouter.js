const express = require('express');
const Joi = require('@hapi/joi');
const directors = require('../models/director');
const validation = require('../utils/validation');

const router = express.Router();

// Manage entire collection of directors resource
router.get('/', async (req, res) => {
  const response = await directors.getAllDirectors();
  res.send(response);
});

router.post('/', async (req, res) => {
  const result = Joi.validate(req.body, validation.directorsSchema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  } else {
    const response = await directors.addNewDirector(req.body);
    res.send(response);
  }
});

// Manage single director resource
router.get('/:directorId', async (req, res) => {
  const response = await directors.getDirectorById(req.params.directorId);
  if (response.length === 0) res.status(404).send('The Director with the given Id was not found');
  else res.send(response);
});

router.put('/:directorId', async (req, res) => {
  const result = Joi.validate(req.body, validation.directorsSchema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  } else {
    const response = await directors.updateDirectorById(req.params.directorId, req.body);
    res.send(response);
  }
});

router.delete('/:directorId', async (req, res) => {
  const response = await directors.deleteDirectorById(req.params.directorId);
  res.send(response);
});

module.exports = router;
