import React, { useEffect } from 'react';
import Movies from './components/Movies'
import './styles/main.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoadingBar from './components/layout/LoadingBar';
import Header from './components/layout/Header';

import LoginPage from '../src/pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MovieDetailPage from '../src/pages/MovieDetailPage';
import WatchlistPage from '../src/pages/WatchlistPage';

import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import { loadUser } from './store/auth';
import SideNav from './components/layout/SideNav';

const store = configureStore();

export default function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  })

  return (
    <Router>
      <Provider store={store}>
        <LoadingBar />
        <Header />
        <SideNav />
        <Switch>
          <Route path="/movie/:id" component={MovieDetailPage}></Route>
          <Route path="/register" component={RegisterPage}></Route>
          <Route path="/login" component={LoginPage}></Route>
          <Route path="/:username" component={WatchlistPage}></Route>
          <Route exact path="/" component={Movies} />
        </Switch>
      </Provider>
    </Router>
  )
}
