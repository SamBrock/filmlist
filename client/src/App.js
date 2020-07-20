import React, { useEffect } from 'react';
import Movies from './components/Movies'
import Header from './components/layout/Header'
import './styles/main.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MovieDetailPage from '../src/pages/MovieDetailPage';
import LoadingBar from './components/layout/LoadingBar';

import { Provider, useSelector, useDispatch } from 'react-redux'
import configureStore from './store/configureStore';
import { loadUser } from './store/auth';
import RegisterModal from './components/auth/RegisterModal';

const store = configureStore();

export default function App() {
  // const dispatch = useDispatch();
  
  useEffect(() => {
    store.dispatch(loadUser())
  })

  return (
    <Router>
      <Provider store={store}>
        <div className="container">
          <div data-router-wrapper>
            <RegisterModal />
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
