import React, { Component } from 'react'
import axios from 'axios'
import Movies from './components/Movies'
import Header from './components/layout/Header'
import './styles/main.scss'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import MovieDetailPage from '../src/pages/MovieDetailPage'



export default class App extends Component {
  state = {
    movies: [],
    genres: []
  }

  componentDidMount() {
    //https://api.themoviedb.org/3/movie/270303/recommendations?api_key=f232b12b7f9ade28ae71866f4777033a&language=en-US&page=1
    //https://api.themoviedb.org/3/movie/popular?api_key=f232b12b7f9ade28ae71866f4777033a&language=en-US&page=1
    axios.get('https://api.themoviedb.org/3/movie/531428/recommendations?api_key=f232b12b7f9ade28ae71866f4777033a&language=en-US&page=2')
      .then(res => this.setState({ movies: res.data.results })
      );

    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=f232b12b7f9ade28ae71866f4777033a&language=en-US')
      .then(res => this.setState({ genres: res.data.genres })
      );
  }

  render() {
    var newGenres = this.state.genres.forEach(function (genre) {
      if (genre.name === "Science Fiction") {
        genre.name = "Sci-Fi";
      }
    })

    return (
      <Router>
        <div className="container">
          <Header />
          <div data-router-wrapper>
            <Switch>
              <Route exact path="/" render={props => (
                <React.Fragment>
                  <div className="movies-container" data-router-view="movie">
                    <Movies movies={this.state.movies} genres={this.state.genres} />
                  </div>
                </React.Fragment>
              )} />
              <Route path="/movie/:id" component={MovieDetailPage}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}