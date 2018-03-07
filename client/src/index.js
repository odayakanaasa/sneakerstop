import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createBrowserHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import './stylesheets/dist/main.css';

ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
