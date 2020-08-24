import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoadingBar from './components/layout/LoadingBar';
import Header from './components/layout/Header';
import Notification from './components/layout/Notification';

import MoviesPage from '../src/pages/MoviesPage'
import LoginPage from '../src/pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MovieDetailPage from '../src/pages/MovieDetailPage';
import WatchlistPage from '../src/pages/WatchlistPage';
import SeenPage from './pages/SeenPage';

import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import { loadUser } from './store/auth';
import SideNav from './components/layout/SideNav';

import { AnimatePresence } from 'framer-motion';
import './styles/main.scss'

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
        <Notification />
        <Route render={({ location }) => (
          <AnimatePresence initial={true} exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
              <Route path="/movie/:id" component={MovieDetailPage}></Route>
              <Route path="/register" component={RegisterPage}></Route>
              <Route path="/login" component={LoginPage}></Route>
              <Route path="/:username/watchlist" component={WatchlistPage}></Route>
              <Route path="/:username/seen" component={SeenPage}></Route>
              <Route exact path="/" component={MoviesPage} />
            </Switch>
          </AnimatePresence>
        )} />
      </Provider>
    </Router>
  )
}
