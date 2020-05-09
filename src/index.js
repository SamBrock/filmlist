import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Highway from '@dogstudio/highway';
import Fade from './transitions/transitions' 



ReactDOM.render(<App />, document.getElementById('root'));
const H = new Highway.Core({
    transitions: {
      default: Fade
    }
  })

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
