'use strict';

import _ from 'lodash';
import {
    PLAYERS_RECEIVED,
    PLAYER_ADDED,
    PLAYER_CHANGED,
    PLAYER_REMOVED
} from '../actions/actionTypes';

const initialState = {};

export default function fbReducer(state = initialState, action = {}) {
    let newState, newSubState;
    switch (action.type) {
        case PLAYERS_RECEIVED:
            return action.players;
        case PLAYER_ADDED:
            newState = _.clone(state);
            newState[action.id] = action.value;
            return newState;
        case PLAYER_CHANGED:
            newState = _.clone(state);
            newState[action.id] = action.value;
            return newState;
        case PLAYER_REMOVED:
            if (!_.has(state, action.id)){
                return state;
            }

            newState = _.clone(state);
            delete newState[action.id];

            return newState;
        default:
            return state;
    }
}
