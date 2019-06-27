/* eslint-disable no-console */
const dataBaseCredentials = require('../data/dataBaseCredentials');

const { con } = dataBaseCredentials;

// Get all directors
const movieDirectors = function movieDirectors() {
  con.query('SELECT * FROM directorsData', (error, directorsData) => {
    if (error) throw error;
    directorsData.forEach((directorData) => {
      console.log(`${directorData.dirId}: ${directorData.Director_Name}`);
    });
  });
};
// movieDirectors();

//----------------------------------------------------------------------------------------
// Get director with given Id
const directorById = function directorById(Id) {
  con.query(`SELECT Director_Name FROM directorsData WHERE dirId = ${Id}`, (error, result) => {
    console.log(result[0].Director_Name);
  });
};
// directorById(3);

//----------------------------------------------------------------------------------------
// Add a new director
// Reset Auto Increment Row Before Entering New Director
const resetAutoIncrement = function resetAutoIncrement(table) {
  return new Promise((resolve, reject) => {
    con.query(`ALTER TABLE ${table} AUTO_INCREMENT = 1`, (error, result) => {
      if (error) reject(error);
      resolve();
    });
  });
};
const addNewDirector = async function addNewDirector(director) {
  await resetAutoIncrement('directorsData');
  con.query(`INSERT INTO directorsData(Director_Name) VALUES ('${director}')`, (error, result) => {
    if (error) throw error;
    console.log(result);
  });
};
// addNewDirector('Souma Ghosh');

//----------------------------------------------------------------------------------------
// Update Director with given Id
const updateById = function updateById(Id, name) {
  const queryString = `UPDATE directorsData SET Director_Name='${name}' WHERE dirId=${Id};`;
  console.log(queryString);
  con.query(queryString, (error, result) => {
    if (error) throw error;
    console.log(result);
  });
};
// updateById(36, 'cRuzifiX');

//----------------------------------------------------------------------------------------
// Delete director with given Id
const deleteDirectorById = function deleteDirectorById(Id) {
  con.query(`DELETE FROM directorsData WHERE directorsData.dirId = ${Id}`, (error, result) => {
    if (error) throw error;
    console.log(result);
  });
};
// deleteDirectorById(13);
