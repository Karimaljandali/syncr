import React from 'react';
import ReactDOM from 'react-dom';
import Syncr from './App';
import registerServiceWorker from './registerServiceWorker';
import './styles/main.css';

ReactDOM.render(<Syncr/>, document.getElementById('root'));
registerServiceWorker();
