'use strict';

import {
    onValue,
} from "../../utils/generalDBUtils";
import * as actionTypes from "./actionTypes";

const playersReceived = (players) => {
    return {
        type: actionTypes.PLAYERS_RECEIVED,
        players
    };
};

export const listenToPlayers  = () => onValue('/players', playersReceived);
