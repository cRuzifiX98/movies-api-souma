/* eslint-disable no-console */
const dataBaseCredentials = require('../data/dataBaseCredentials');
const seed = require('./seed');

const { con } = dataBaseCredentials;

// Get all movies
const allMovies = function allMovies() {
  con.query('SELECT * FROM moviesData JOIN directorsData ON moviesData.Director_Id = directorsData.dirId', (error, result) => {
    if (error) throw error;
    const moviesList = result.reduce((movies, movie) => {
      movies.push(movie);
      return movies;
    }, []);
    console.log(moviesList);
    con.end();
  });
};
// allMovies();

//----------------------------------------------------------------------------------------
// Get movie by Id
const movieById = function movieById(Id) {
  con.query(`SELECT Title FROM moviesData
  WHERE moviesData.Id = ${Id}`, (error, result) => {
    if (error) throw error;
    console.log(result[0].Title);
    con.end();
  });
};
// movieById(9);

//----------------------------------------------------------------------------------------
// Add a new movie sub functions

// Reset Auto_Increment Row Before New Entry
const resetAutoIncrement = function resetAutoIncrement(table) {
  return new Promise((resolve, reject) => {
    con.query(`ALTER TABLE ${table} AUTO_INCREMENT = 1`, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};
const addDirectorIfNotExists = function addDirectorIfNotExists(movies) {
  return new Promise((resolve, reject) => {
    movies.forEach((movie) => {
      con.query(`SELECT * FROM directorsData WHERE directorsData.Director_Name = '${movie.Director}'`, (error, result) => {
        console.log('========================');
        if (error) reject(error);
        if (!result.length) seed.populateDirectorsTable(movies);
        resolve();
      });
    });
  });
};
const addMovieIfNotExists = function addMovieIfNotExists(movies) {
  movies.forEach((movie) => {
    console.log(movie.Title);
    con.query(`SELECT * FROM moviesData WHERE moviesData.Title = '${movie.Title}'`, (error, result) => {
      if (error) throw error;
      if (!result.length) seed.insertData(movies, 'moviesData');
    });
  });
};

// Add a new movie main function

const newMovie = async function newMovie(movies, table) {
  await resetAutoIncrement(table);
  await addDirectorIfNotExists(movies);
  addMovieIfNotExists(movies);
};
// newMovie([{
//   Rank: 60,
//   Title: 'Inception 2',
//   Description: `A thief, who steals corporate secrets through the use of dream-sharing
//   technology, is given the inverse task of planting an idea into the mind of a CEO.`,
//   Runtime: 148,
//   Genre: 'Action',
//   Rating: 8.8,
//   Metascore: 74,
//   Votes: 1692709,
//   Gross_Earning_in_Mil: 292.58,
//   Director: 'Christopher Nolan',
//   Actor: 'Leonardo DiCaprio',
//   Year: 2010,
// }], 'directorsData');


//--------------------------------------------------------------------------------------
// Update movie with given ID
const updateMovieById = function updateMovieById(Id, updateData) {
  // updateData should be in array of Objects form like [{},{}]
  updateData.forEach((update) => {
    con.query(`UPDATE moviesData
    SET ${Object.keys(update)[0]} = ${Object.values(update)[0]}
    WHERE moviesData.Id = ${Id}`, (error, result) => {
      if (error) throw error;
      console.log(result);
    });
  });
};
// updateMovieById(50, [{ Rank: 100 }, { Runtime: 100 }]);


// Delete movie with given Id
const deleteMovieById = function deleteMovieById(Id) {
  con.query(`DELETE FROM moviesData
  WHERE moviesData.Id = ${Id}`, (error, result) => {
    if (error) throw error;
    console.log(result);
  });
};
// deleteMovieById(46);
