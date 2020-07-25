import React, { useEffect } from 'react';
import Movies from './components/Movies'
import LeftNav from './components/layout/LeftNav'
import RightNav from './components/layout/RightNav';
import './styles/main.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginPage from '../src/pages/LoginPage';
import MovieDetailPage from '../src/pages/MovieDetailPage';
import LoadingBar from './components/layout/LoadingBar';

import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import Header from './components/layout/Header.js';

const store = configureStore();

export default function App() {

  // useEffect(() => {
  //   store.dispatch(loadUser())
  // })

  return (
    <Router>
      <Provider store={store}>
        <LoadingBar />
          <Header />
          <Switch>
            <Route path="/movie/:id" component={MovieDetailPage}></Route>
            <Route path="/login" component={LoginPage}></Route>
            <Route exact path="/" component={Movies} />
          </Switch>
      </Provider>
    </Router>
  )
}
