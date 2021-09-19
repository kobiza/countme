'use strict';

import {
    PLAYERS_RECEIVED,
} from '../actions/actionTypes';

const initialState = {};

export default function fbReducer(state = initialState, action = {}) {
    switch (action.type) {
        case PLAYERS_RECEIVED:
            return action.players;
        default:
            return state;
    }
}
