const Joi = require('@hapi/joi');

module.exports.moviesPostSchema = {
  Title: Joi.string().min(3).max(50).required(),
  Rank: Joi.number().min(1),
  Description: Joi.string().min(10),
  Runtime: Joi.number().min(10),
  Genre: Joi.string().min(1),
  Rating: Joi.number().min(1),
  Metascore: Joi.string(),
  Votes: Joi.number(),
  Gross_Earning_in_Mil: Joi.string(),
  Director_Id: Joi.number().min(1),
  Actor: Joi.string().min(3),
  Year: Joi.number().min(1800).max(2022),
};

module.exports.moviesPutSchema = {
  Title: Joi.string().min(3).max(50),
  Rank: Joi.number().min(1),
  Description: Joi.string().min(10),
  Runtime: Joi.number().min(10),
  Genre: Joi.string().min(1),
  Rating: Joi.number().min(1),
  Metascore: Joi.string(),
  Votes: Joi.number(),
  Gross_Earning_in_Mil: Joi.string(),
  Director_Id: Joi.number().min(1),
  Actor: Joi.string().min(3),
  Year: Joi.number().min(1800).max(2022),
};

module.exports.directorsSchema = {
  Director_Name: Joi.string().min(3).max(30).required(),
};
