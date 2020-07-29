'use strict';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {initDB} from './utils/DAL.js';
import makeStore from './redux/makeStore';


import App from './components/App.jsx';

const store = makeStore();

class AppWrapper extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}

var fbConfig = {
    apiKey: "AIzaSyBbOSSGQNG_EArQ2Wqh7a3rQ2rTaLPy0e8",
    authDomain: "countme-30406.firebaseapp.com",
    databaseURL: "https://countme-30406.firebaseio.com",
    projectId: "countme-30406",
    storageBucket: "countme-30406.appspot.com",
    messagingSenderId: "90811334047",
    appId: "1:90811334047:web:d8c1e80a10887216b6d1aa"
};


initDB(fbConfig);

render(<AppWrapper/>, document.getElementById('app'));
