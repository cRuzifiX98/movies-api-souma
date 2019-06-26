/* eslint-disable quotes */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const mysql = require('mysql');
const data = require('../data/movies.json');
const movies = require('./movies');
const dataBaseCredentials = require('../data/dataBaseCredentials');

// function dbConnection(dbDetails) {
//   return mysql.createConnection(dbDetails);
// }
const con = mysql.createConnection({
  host: '172.17.0.2',
  user: 'root',
  password: 'root',
  database: 'movies',
});

// const con = dbConnection(dataBaseCredentials.dbDetails);

// CREATE DATABASE SUB FUNCTION
const createDatabase = function createDatabase(name) {
  return new Promise((resolve, reject) => {
    con.query(`CREATE DATABASE IF NOT EXISTS ${name}`, (error, result) => {
      if (error) throw error;
      console.log('Database created');
      resolve();
    });
  });
};

// CREATE DATABASE MAIN FUNCTION

const newDataBase = function newDataBase(name) {
  con.connect(async (err) => {
    if (err) throw err;
    console.log('Connected!');
    await createDatabase(name);
    con.end();
  });
};
module.exports.newDataBase = newDataBase;


// CREATE TABLE SUB FUNTIONS
const dropExistingTable = function dropExistingTable(name) {
  return new Promise((resolve, reject) => {
    con.query(`DROP TABLE IF EXISTS ${name}`, (error, result) => {
      if (error) throw error;
      console.log('Existing Table dropped');
      resolve();
    });
  });
};
const createNewTable = function createNewTable(name, query) {
  const sql = `CREATE TABLE ${name} ${query} `;
  con.query(sql, (error, result) => {
    if (error) throw error;
    console.log(`Table created`);
  });
};

// CREATE TABLE MAIN FUNTION

const createTable = async function createTable(name, query) {
  await dropExistingTable(name);
  createNewTable(name, query);
};

// createTable('directorsData', `(Id INT PRIMARY KEY AUTO_INCREMENT,
// Director_Name VARCHAR(50) NOT NULL)`);

// createTable('moviesData', `(Id INT PRIMARY KEY AUTO_INCREMENT,
//   Rank INT,
//   Title VARCHAR(100) NOT NULL,
//   Description TEXT,
//   Runtime INT,
//   Genre VARCHAR(20),
//   Rating FLOAT,
//   Metascore TEXT,
//   Votes MEDIUMINT,
//   Gross_Earning_in_Mil TEXT,
//   Director_Id INT,
//   Actor VARCHAR(50),
//   Year INT,
//   FOREIGN KEY (Director_Id) REFERENCES directorsData(Id))`);


// POPULATE DIRECTORS TABLE SUB FUNCTIONS
const uniqueDirectorsObject = function uniqueDirectorsObject(data) {
  const uniqueDirectors = new Set();
  data.forEach((movie) => {
    uniqueDirectors.add(movie.Director);
  });
  return uniqueDirectors;
};
const insertContent = function insertContent(directorObject, table) {
  directorObject.forEach((elem) => {
-    con.query(`INSERT INTO ${table}(Director_Name) VALUES("${elem}")`, (error, result) => {
      if (error) throw error;
      console.log(result);
    });
  });
};

// POPULATE DIRECTORS TABLE MAIN FUNCTION

const populateDirectorsTable = function populateDirectorsTable(data, table) {
  const directorObject = uniqueDirectorsObject(data);
  insertContent(directorObject, table);
};
// populateDirectorsTable(data, 'directorsData');


// POPULATE MOVIES TABLE SUB FUNCTIONS
const truncateTable = function truncateTable(table) {
  return new Promise((resolve, reject) => {
    con.query(`TRUNCATE ${table}`, (error, result) => {
      if (error) throw error;
      resolve();
    });
  });
};

// POPULATE MOVIES TABLE MAIN FUNCTION

const populateMoviesTable = function populateMoviessTable(data, table) {
  con.connect(async (err) => {
    if (err) throw err;
    console.log('Connected!');
    await truncateTable(table);
    data.forEach(async (movie) => {
      const director = movie.Director;
      const id = new Promise((resolve, reject) => {
        con.query(`SELECT Id FROM directorsData
        WHERE directorsData.Director_Name = '${director}'`, (error, result) => {
          if (error) reject(err);
          // console.log(result[0].Id);
          resolve(result[0].Id);
        });
      });
      const directorId = await id;
      con.query(`INSERT INTO ${table} (Rank, Title, Description, Runtime, Genre, Rating, Metascore, Votes, Gross_Earning_in_Mil, Director_Id, Actor, Year)
      VALUES (${movie.Rank},
      "${movie.Title}",
      "${movie.Description}",
      ${movie.Runtime},
      "${movie.Genre}",
      ${movie.Rating},
      "${movie.Metascore}",
      ${movie.Votes},
      "${movie.Gross_Earning_in_Mil}",
      ${directorId},
      "${movie.Actor}",
      ${movie.Year})`, (error, result) => {
        if (error) throw error;
        console.log(result);
      });
    });
  });
};
// populateMoviesTable(data, 'moviesData');


//  FUNCTIONS FOR QUERIES

// Get all directors
const movieDirectors = function movieDirectors() {
  con.query('SELECT * FROM directorsData', (error, directorsData) => {
    if (error) throw error;
    directorsData.forEach((directorData) => {
      console.log(`${directorData.Id} ${directorData.Director_Name}`);
    });
  });
};
// movieDirectors();

// Get director with given Id
const directorById = function directorById(Id) {
  con.query(`SELECT Director_Name FROM directorsData WHERE Id = ${Id}`, (error, result) => {
    console.log(result[0].Director_Name);
  });
};
// directorById(32);

// Add a new director
const addNewDirector = function addNewDirector() {
  con.query(`INSERT INTO `, (error, result) => {

  });
};
