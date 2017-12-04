import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import store from 'store';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
registerServiceWorker();