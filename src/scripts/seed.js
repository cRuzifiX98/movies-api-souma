/* eslint-disable no-console */
const data = require('../../data/movies.json');
const dataBaseCredentials = require('../utils/dataBaseCredentials');

const { con } = dataBaseCredentials;

//-------------------------------------------------------------------------------
// CREATE DATABASE SUB FUNCTION
const createDatabase = function createDatabase(name) {
  return new Promise((resolve, reject) => {
    con.query(`CREATE DATABASE IF NOT EXISTS ${name}`, (error, result) => {
      if (error) reject(console.error(error));
      console.log('Database created');
      resolve(result);
    });
  });
};

// CREATE DATABASE MAIN FUNCTION

const newDataBase = function newDataBase(name) {
  con.connect(async (err) => {
    if (err) throw err;
    console.log('Connected!');
    await createDatabase(name);
  });
};

//----------------------------------------------------------------------------------------
// CREATE TABLE SUB FUNTIONS
const setForeignKeyChecks = function setForeignKeyChecks(value) {
  return new Promise((resolve, reject) => {
    con.query(`SET FOREIGN_KEY_CHECKS = ${value};`, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};
const dropExistingTable = function dropExistingTable(name) {
  return new Promise((resolve, reject) => {
    con.query(`DROP TABLE IF EXISTS ${name}`, (error, result) => {
      if (error) reject(error);
      console.log(`Existing ${name} Table dropped if present`);
      resolve(result);
    });
  });
};
const createNewTable = function createNewTable(name, query) {
  return new Promise((resolve, reject) => {
    const sql = `CREATE TABLE ${name} ${query} `;
    con.query(sql, (error, result) => {
      if (error) reject(error);
      console.log(`${name} Table created`);
      resolve(result);
    });
  });
};

// CREATE TABLE MAIN FUNTION

const createTable = async function createTable(name, query) {
  return new Promise(async (resolve, reject) => {
    try {
      await setForeignKeyChecks(0);
      await dropExistingTable(name);
      await createNewTable(name, query);
      await setForeignKeyChecks(1);
    } catch (error) {
      reject(console.error(error));
    }
    resolve();
  });
};

//----------------------------------------------------------------------------------------
// POPULATE DIRECTORS TABLE SUB FUNCTIONS
const uniqueDirectorsObject = function uniqueDirectorsObject(moviesData) {
  const uniqueDirectors = moviesData.reduce((acc, movie) => {
    if (!acc.includes(movie.Director)) acc.push(movie.Director);
    return acc;
  }, []);
  return uniqueDirectors;
};
const insertContent = function insertContent(directorArray) {
  const promisesArray = directorArray.reduce((promiseAcc, director) => {
    const promise = new Promise((res, rej) => {
      con.query(`INSERT INTO directorsData(Director_Name) VALUES("${director}")`, (error, result) => {
        if (error) rej(error);
        else res(result);
      });
    });
    promiseAcc.push(promise);
    return promiseAcc;
  }, []);
  return Promise.all(promisesArray);
};

// POPULATE DIRECTORS TABLE MAIN FUNCTION

const populateDirectorsTable = function populateDirectorsTable(moviesData) {
  return new Promise(async (resolve, reject) => {
    const directorArray = uniqueDirectorsObject(moviesData);
    await insertContent(directorArray);
    resolve();
  });
};
// populateDirectorsTable(data);


//----------------------------------------------------------------------------------------
// POPULATE MOVIES TABLE SUB FUNCTIONS
const getDirId = function getDirId(director) {
  return new Promise((resolve, reject) => {
    con.query(`SELECT dirId FROM directorsData
      WHERE directorsData.Director_Name = '${director}'`, (error, result) => {
      if (error) reject(error);
      resolve(result[0].dirId);
    });
  });
};
const insertData = function insertData(moviesData, table) {
  const promiseArray = moviesData.map(async (movie) => {
    const director = movie.Director;
    const directorId = await getDirId(director);
    return new Promise((resolve, reject) => {
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
        resolve();
      });
    });
  });
  return Promise.all(promiseArray);
};

// POPULATE MOVIES TABLE MAIN FUNCTION

const populateMoviesTable = function populateMoviessTable(moviesData, table) {
  return new Promise(async (resolve, reject) => {
    await insertData(moviesData, table);
    resolve();
  });
};
// populateMoviesTable(data, 'moviesData');


const main = async function main() {
  try {
    await createTable('directorsData', `(dirId INT PRIMARY KEY AUTO_INCREMENT,
      Director_Name VARCHAR(50) NOT NULL)`);
    await createTable('moviesData', `(Id INT PRIMARY KEY AUTO_INCREMENT,
        Rank INT,
        Title VARCHAR(100) NOT NULL,
        Description TEXT,
        Runtime INT,
        Genre VARCHAR(20),
        Rating FLOAT,
        Metascore TEXT,
        Votes MEDIUMINT,
        Gross_Earning_in_Mil TEXT,
        Director_Id INT,
        Actor VARCHAR(50),
        Year INT,
        FOREIGN KEY (Director_Id) REFERENCES directorsData(dirId) ON DELETE CASCADE)`);
    await populateDirectorsTable(data);
    await populateMoviesTable(data, 'moviesData');
  } catch (error) {
    console.log(error);
  }
};

// main();

module.exports.newDataBase = newDataBase;
module.exports.populateDirectorsTable = populateDirectorsTable;
module.exports.insertData = insertData;
