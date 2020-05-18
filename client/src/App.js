import React from 'react';
import { Provider, useSelector } from 'react-redux'
import configureStore from './store/configureStore';
import Movies from './components/Movies'
import Header from './components/layout/Header'
import './styles/main.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MovieDetailPage from '../src/pages/MovieDetailPage';
import LoadingBar from './components/LoadingBar';

const store = configureStore();

export default function App() {

  return (
    <Router>
      <Provider store={store}>
        <div className="container">
          <div data-router-wrapper>
            <LoadingBar />
            <Header />
            <Switch>
              <Route path="/movie/:id" component={MovieDetailPage}></Route>
              <Route exact path="/" component={Movies} />
            </Switch>
          </div>
        </div>
      </Provider>
    </Router>
  )
}
