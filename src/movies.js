module.exports.getAllDirectors = function allDirectors(directorsData) {
  const result = directorsData.reduce((directors, movie) => {
    if (!directors.includes(movie.Director)) directors.push(movie.Director);
    return directors;
  }, []);
  return result;
};
