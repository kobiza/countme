import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import playersReducer from './reducers/playersReducer';

const makeStore = initialState => {
    const reducers = combineReducers({
        players: playersReducer
    });

    const middleware = applyMiddleware(
        thunk
    );

    return createStore(reducers, undefined, middleware);
};

export default makeStore;
