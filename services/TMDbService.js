const axios = require('axios');

const baseURL = process.env.BASE_URL;
const api_key = process.env.API_KEY;

async function getDataArr(movieArr) {
  const movies = [];

  for await (const id of movieArr) {
    const url = `/movie/${id}?api_key=${api_key}`;
    const { data } = await axios.get(baseURL + url);

    movies.push(data);
  };

  return movies;
}

async function getRecommendationsArr(movieArr) {
  const recommendations = [];

  for await (const id of movieArr) {
    const url = `/movie/${id}/recommendations?api_key=${api_key}`;
    const { data } = await axios.get(baseURL + url);

    recommendations.push(data.results);
  };

  return recommendations.flat();
}

module.exports = { getDataArr, getRecommendationsArr };