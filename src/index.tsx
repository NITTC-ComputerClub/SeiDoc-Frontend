import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history'
import App from './App';
import * as serviceWorker from './serviceWorker';

import Store, { persistor } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const history = createHistory()

ReactDOM.render(
    <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router history={history}>
                <App />
            </Router>
        </PersistGate>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
