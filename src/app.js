/* eslint-disable no-console */
const express = require('express');
const Joi = require('@hapi/joi');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to movies API!!');
});

app.use('/api/movies', require('./routes/movieRouter'));
app.use('/api/directors', require('./routes/directorRouter'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
