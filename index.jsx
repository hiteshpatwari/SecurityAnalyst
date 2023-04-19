import React from 'react';
import ReactDOM from 'react-dom';
import App from './renderer.jsx';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('app'));
});
