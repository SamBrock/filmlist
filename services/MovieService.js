const moment = require('moment');

function getMovieDetails(movie) {
  // Get relevant movie details
  movie = {
    id: movie.id,
    title: movie.title,
    backdrop_path: movie.backdrop_path,
    genres: movie.genres,
    overview: movie.overview,
    release_date: movie.release_date,
    year: new Date(movie.release_date).getFullYear(),
    runtime: `${moment.duration({"minutes": movie.runtime}).hours()}h ${moment.duration({"minutes": movie.runtime}).minutes()}m`,
    credits: movie.credits
  }

  // Limit cast to 10
  movie.credits.cast = movie.credits.cast
    .filter(member => member.order <= 10)
    .map(member => {
      return { id: member.id, name: member.name, character: member.character };
    })

  // Get Writer & Director
  movie.credits.crew = movie.credits.crew
    .filter(member => member.job === 'Director' || member.job === 'Screenplay' || member.job === 'Writer')
    .map(member => {
      const obj = { id: member.id, name: member.name };
      if (member.job === 'Screenplay') return { ...obj, job: 'Writer' };
      return { ...obj, job: member.job };
    })

  const groupCrew = movie.credits.crew
    .reduce((member, i) => {
      if (member[i.id]) {
        member[i.id].job = [member[i.id].job, i.job].join(', ')
      } else {
        member[i.id] = i
      }
      return member
    }, {})

    movie.credits.crew = Object.values(groupCrew);
    

  return movie;
}

exports.getMovieDetails = getMovieDetails;