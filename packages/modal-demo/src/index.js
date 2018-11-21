import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Example from './ModalExample';
ReactDOM.render(<Example />, document.getElementById('root'));

registerServiceWorker();
