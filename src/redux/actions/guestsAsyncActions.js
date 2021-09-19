'use strict';

import {
    onValue,
} from "../../utils/generalDBUtils";
import * as actionTypes from "./actionTypes";

const guestsReceived = (guests) => {
    return {
        type: actionTypes.GUESTS_RECEIVED,
        guests
    };
};

export const listenToGuests  = () => onValue('/guests', guestsReceived);
