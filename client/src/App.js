import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AnimatePresence } from 'framer-motion';

import LoadingBar from './components/layout/LoadingBar';
import Notification from './components/layout/Notification';
import MoviesPage from '../src/pages/MoviesPage'
import LoginPage from '../src/pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MovieDetailPage from '../src/pages/MovieDetailPage';
import WatchlistPage from '../src/pages/WatchlistPage';
import SeenPage from './pages/SeenPage';
import SearchPage from './pages/SearchPage';
import FavoriteMovies from './pages/FavoriteMovies';

import configureStore from './store/configureStore';

import GlobalStyle from './styles/GlobalStyles';
import Layout from './components/Layout';
import { loadUser } from './store/auth';

const store = configureStore();

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  })

  return (
    <Router>
      <Provider store={store}>
        <GlobalStyle />
        <LoadingBar />
        <Layout>
          <Route render={({ location }) => (
            <AnimatePresence initial={false} exitBeforeEnter>
              <Switch location={location} key={location.pathname}>
                <Route path="/movie/:id" component={MovieDetailPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/search" component={SearchPage} />
                <Route path="/favorite-films" component={FavoriteMovies} />
                <Route path="/:username/watchlist" component={WatchlistPage} />
                <Route path="/:username/seen" component={SeenPage} />
                <Route exact path="/" component={MoviesPage} />
              </Switch>
            </AnimatePresence>
          )} />
        </Layout>
        <Notification />
      </Provider>
    </Router>
  )
}
