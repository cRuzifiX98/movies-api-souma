/* eslint-disable quotes */
/* eslint-disable no-console */
const dataBaseCredentials = require('../utils/dataBaseCredentials');
const seed = require('../scripts/seed');

const { con } = dataBaseCredentials;

// Get all movies
const getAllMovies = function getAllMovies() {
  return new Promise((resolve, reject) => {
    con.query('SELECT * FROM moviesData JOIN directorsData ON moviesData.Director_Id = directorsData.dirId', (error, result) => {
      if (error) reject(error);
      const moviesList = result.reduce((movies, movie) => {
        movies.push(movie);
        return movies;
      }, []);
      resolve(moviesList);
    });
  });
};
// getAllMovies();

//----------------------------------------------------------------------------------------
// Get movie by Id
const getMovieById = function getMovieById(Id) {
  return new Promise((resolve, reject) => {
    con.query(`SELECT * FROM moviesData JOIN directorsData ON moviesData.Director_Id = directorsData.dirId
    WHERE moviesData.Id = ${Id}`, (error, result) => {
      if (error) reject(error);
      // console.log(result[0].Title);
      resolve(result);
    });
  });
};
// movieById(9);

//---------------------------------------------------------------------------------------
// Add a new movie

const addNewMovie = async function addNewMovie(movieData) {
  return new Promise((resolve, reject) => {
    con.query(`INSERT INTO moviesData SET ?`, movieData, (error, result) => {
      if (error) reject(console.error(error));
      resolve(result);
    });
  });
};
// addNewMovie({
//   Rank: 62,
//   Title: 'Inception 4',
//   Description: `A thief, who steals corporate secrets through the use of dream-sharing
//   technology, is given the inverse task of planting an idea into the mind of a CEO.`,
//   Genre: 'Action',
//   Gross_Earning_in_Mil: 292.58,
//   Director_Id: 3,
//   Actor: 'Leonardo DiCaprio',
//   Year: 2010,
// });


//--------------------------------------------------------------------------------------
// Update movie with given ID
const updateMovieById = function updateMovieById(Id, updatedData) {
  return new Promise((resolve, reject) => {
    con.query(`UPDATE moviesData SET ? WHERE Id = ${Id};`, updatedData, (error, result) => {
      if (error) reject(console.error(error));
      console.log('Updated');
      resolve(result);
    });
  });
};
const updatedData = {
  Title: 'dodododdododod',
  Rank: 99,
  Description: 'New updated description for the movie',
  Runtime: 99,
  Genre: 'Crime',
};
// updateMovieById(50, updatedData);


// Delete movie with given Id
const deleteMovieById = function deleteMovieById(Id) {
  return new Promise((resolve, reject) => {
    con.query(`DELETE FROM moviesData WHERE moviesData.Id = ${Id}`, (error, result) => {
      if (error) throw error;
      console.log(result);
      resolve();
    });
  });
};
// deleteMovieById(46);


module.exports.getAllMovies = getAllMovies;
module.exports.getMovieById = getMovieById;
module.exports.addNewMovie = addNewMovie;
module.exports.updateMovieById = updateMovieById;
module.exports.deleteMovieById = deleteMovieById;
