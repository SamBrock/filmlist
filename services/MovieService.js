const moment = require('moment');
const config = require('config');
const axios = require('axios');
const _ = require('lodash');
const mongoose = require('mongoose');

const baseURL = config.get('TMDb.baseURL');
const api_key = config.get('TMDb.api_key');


async function getTMDbData(userArr) {
  const arr = [];

  const requests = userArr.map(async user => {
    const url = `/movie/${user.filmId}?api_key=${api_key}`;
    const response = await axios.get(baseURL + url);

    let movie = response.data;
    movie.timestamp = mongoose.Types.ObjectId(user.id).getTimestamp();
    movie.rating = user.rating ? user.rating : 0;
    movie.like = user.like ? true : false;
    
    return arr.push(movie);
  });

  await Promise.all(requests);

  arr.sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  return arr;
}

async function getTMDbRecommendedMovies(userArr) {
  let arr = [];

  const requests = userArr.map(async user => {
    const url = `/movie/${user.filmId}/recommendations?api_key=${api_key}`;
    const response = await axios.get(baseURL + url);

    return arr.push(response.data.results);
  });

  await Promise.all(requests);

  arr = _.flatten(arr);

  return arr;
}

function getMovieDetails(movie) {
  // Get relevant movie details
  movie = {
    id: movie.id,
    title: movie.title,
    backdrop_path: movie.backdrop_path,
    genres: movie.genres,
    tagline: movie.tagline,
    overview: movie.overview,
    release_date: movie.release_date,
    year: new Date(movie.release_date).getFullYear(),
    runtime: `${moment.duration({ "minutes": movie.runtime }).hours()}h ${moment.duration({ "minutes": movie.runtime }).minutes()}m`,
    credits: movie.credits
  }

  // Limit cast to 10
  movie.credits.cast = movie.credits.cast
    .filter(member => member.order <= 10)
    .map(member => {
      return { id: member.id, name: member.name, character: member.character, profile_path: member.profile_path };
    })

  // Get Writer & Director
  movie.credits.crew = movie.credits.crew
    .filter(member => member.job === 'Director' || member.job === 'Screenplay' || member.job === 'Writer')
    .map(member => {
      const obj = { id: member.id, name: member.name };
      if (member.job === 'Screenplay') return { ...obj, job: 'Writer' };
      return { ...obj, job: member.job };
    })
    .sort((a, b) => (a.job > b.job) ? 1 : -1);

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

function getMovieArrDetails(moviesArr) {
  const movies = moviesArr.map(movie => {
    const { id, title, vote_average, release_date, backdrop_path, poster_path, popularity, rating, like } = movie;
    
    return ({
      id, 
      title, 
      vote_average: vote_average.toFixed(1), 
      backdrop_path, 
      poster_path, 
      popularity, 
      year: new Date(release_date).getFullYear(),
      rating,
      like
    })
  })

  return movies;
}

function getMovieSearchArrDetails(moviesArr) {
  const movies = moviesArr.map(movie => {
    const { id, title, vote_average, release_date, backdrop_path, poster_path, popularity } = movie;
    
    return ({
      id, 
      title, 
      vote_average: vote_average.toFixed(1),
      backdrop_path, 
      poster_path,  
      popularity, 
      year: new Date(release_date).getFullYear()
    })
  })

  return movies;
}

exports.getMovieDetails = getMovieDetails;
exports.getMovieArrDetails = getMovieArrDetails;
exports.getTMDbRecommendedMovies = getTMDbRecommendedMovies;
exports.getTMDbData = getTMDbData;
exports.getMovieSearchArrDetails = getMovieSearchArrDetails;