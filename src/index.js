import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Highway from '@dogstudio/highway';
import Fade from './transitions/transitions'



ReactDOM.render(<App />, document.getElementById('root'));
const H = new Highway.Core({
  transitions: {
    default: Fade
  }
})