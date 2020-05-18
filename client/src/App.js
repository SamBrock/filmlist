import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import Movies from './components/Movies'
import Header from './components/layout/Header'
import './styles/main.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MovieDetailPage from '../src/pages/MovieDetailPage';


const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
        <Router>
          <div className="container">
            <Header />
            <div data-router-wrapper>
              <Switch>
                <Route exact path="/" render={props => (
                  <React.Fragment>
                    <div className="movies-container" data-router-view="movie">
                      <Movies />
                    </div>
                  </React.Fragment>
                )} />
                <Route path="/movie/:id" component={MovieDetailPage}></Route>
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
  )
}
