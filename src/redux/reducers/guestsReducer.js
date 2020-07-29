'use strict';

import {
    GUESTS_RECEIVED,
} from '../actions/actionTypes';

const initialState = {};

export default function fbReducer(state = initialState, action = {}) {
    switch (action.type) {
        case GUESTS_RECEIVED:
            return action.guests;
        default:
            return state;
    }
}
