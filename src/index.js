import React from 'react';
import ReactDOM from 'react-dom';

import './css/App.scss'

import { BrowserRouter as Router } from "react-router-dom";
import { AppContextProvider } from "./components/app/AppContext";

import * as serviceWorker from './serviceWorker';
import App from './components/app/App'; 

ReactDOM.render(
    <AppContextProvider>
        <Router>
            <App />
        </Router>
    </AppContextProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
