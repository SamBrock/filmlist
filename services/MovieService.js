function test() {
  return 'Does this work??';
}

function getMovieDetails(movie) {
  // Get relevant movie details
  movie = {
    id: movie.id,
    title: movie.title,
    backdrop_path: movie.backdrop_path,
    genres: movie.genres,
    overview: movie.overview,
    release_date: movie.release_date,
    runtime: movie.runtime, 
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

      if (member.job === 'Screenplay') {
        return { ...obj, job: 'Writer' };
      }

      return { ...obj, job: member.job };
    })
    .reduce((member, i) => {
      if (member[i.id]) {
        member[i.id].job = [member[i.id].job, i.job].join(', ')
      } else {
        member[i.id] = i
      }
      return member
    }, {})

  return movie;
}

exports.getMovieDetails = getMovieDetails;