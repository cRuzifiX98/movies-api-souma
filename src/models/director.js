/* eslint-disable quotes */
/* eslint-disable no-console */
const dataBaseCredentials = require('../utils/dataBaseCredentials');

const { con } = dataBaseCredentials;

// Get all directors
const getAllDirectors = function getAllDirectors() {
  return new Promise((resolve, reject) => {
    con.query('SELECT * FROM directorsData', (error, directorsData) => {
      if (error) reject(error);
      resolve(directorsData);
    });
  });
};
// getAllDirectors();

//----------------------------------------------------------------------------------------
// Get director with given Id
const getDirectorById = function getDirectorById(Id) {
  return new Promise((resolve, reject) => {
    con.query(`SELECT * FROM directorsData WHERE dirId = ${Id}`, (error, result) => {
      if (error) reject(console.error(error));
      resolve(result);
    });
  });
};
// getDirectorById(3);

//----------------------------------------------------------------------------------------
// Add a new director
const addNewDirector = async function addNewDirector(directorData) {
  return new Promise((resolve, reject) => {
    con.query(`INSERT INTO directorsData SET ?`, directorData, (error, result) => {
      if (error) reject(console.error(error));
      resolve(result);
    });
  });
};

//----------------------------------------------------------------------------------------
// Update Director with given Id
const updateDirectorById = function updateDirectorById(Id, directorData) {
  return new Promise((resolve, reject) => {
    con.query(`UPDATE directorsData SET ? WHERE dirId=${Id};`, directorData, (error, result) => {
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

module.exports.getAllDirectors = getAllDirectors;
module.exports.getDirectorById = getDirectorById;
module.exports.addNewDirector = addNewDirector;
module.exports.updateDirectorById = updateDirectorById;
module.exports.deleteDirectorById = deleteDirectorById;
