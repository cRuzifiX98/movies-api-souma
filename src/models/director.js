/* eslint-disable no-console */
const dataBaseCredentials = require('../utils/dataBaseCredentials');

const { con } = dataBaseCredentials;

// Get all directors
const getAllMovieDirectors = function getAllMovieDirectors() {
  return new Promise((resolve, reject) => {
    con.query('SELECT * FROM directorsData', (error, directorsData) => {
      if (error) reject(error);
      resolve(directorsData);
    });
  });
};
// getAllMovieDirectors();

//----------------------------------------------------------------------------------------
// Get director with given Id
const getDirectorById = function getDirectorById(Id) {
  return new Promise((resolve, reject) => {
    con.query(`SELECT Director_Name FROM directorsData WHERE dirId = ${Id}`, (error, result) => {
      if (error) reject(console.error(error));
      resolve(result[0].Director_Name);
    });
  });
};
// getDirectorById(3);

//----------------------------------------------------------------------------------------
// Add a new director
const addNewDirector = async function addNewDirector(director) {
  return new Promise((resolve, reject) => {
    con.query(`INSERT INTO directorsData(Director_Name) VALUES ('${director}')`, (error, result) => {
      if (error) reject(console.error(error));
      resolve(result);
    });
  });
};
// addNewDirector('Souma Ghosh');

//----------------------------------------------------------------------------------------
// Update Director with given Id
const updateDirectorById = function updateDirectorById(Id, name) {
  return new Promise((resolve, reject) => {
    con.query(`UPDATE directorsData SET Director_Name='${name}' WHERE dirId=${Id};`, (error, result) => {
      if (error) reject(console.error(error));
      console.log(result);
      resolve(result);
    });
  });
};
// updateDirectorById(36, 'cRuzifiX');

//----------------------------------------------------------------------------------------
// Delete director with given Id
const deleteDirectorById = function deleteDirectorById(Id) {
  return new Promise((resolve, reject) => {
    con.query(`DELETE FROM directorsData WHERE directorsData.dirId = ${Id}`, (error, result) => {
      if (error) reject(console.error(error));
      resolve(result);
    });
  });
};
// deleteDirectorById(13);
