import React from 'react';

import {Provider} from 'react-redux';
import makeStore from '../redux/makeStore';
import App from './App.jsx';

const store = makeStore();

function AppWrapper () {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
}

export default AppWrapper;
