import { configureStore } from '@reduxjs/toolkit'
// import { createStore, combineReducers, applyMiddleware } from 'redux';
//
// import thunk from 'redux-thunk';

import playersReducer from './reducers/playersReducer';
import guestsReducer from './reducers/guestsReducer';
import {Player} from "../types/Players";

type StoreState = {
    players: Record<string, Player>
    guests: Record<string, Player>
}

export const store = configureStore<StoreState>({
    reducer: {
        players: playersReducer,
        guests: guestsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
