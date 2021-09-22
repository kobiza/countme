'use strict';

import {
    onValue,
} from "../../utils/generalDBUtils";
import * as actionTypes from "./actionTypes";
import {Player} from "../../types/Players";

const playersReceived = (players: Record<string, Player>) => {
    return {
        type: actionTypes.PLAYERS_RECEIVED,
        players
    };
};

export const listenToPlayers  = () => onValue('/players', playersReceived);
