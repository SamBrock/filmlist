function test() {
  return 'Does this work??';
}

function getMovieDetails(movie) {
  movie.credits.cast = movie.credits.cast.filter(member => member.order <= 10);

  
  return movie;
}

exports.getMovieDetails = getMovieDetails;