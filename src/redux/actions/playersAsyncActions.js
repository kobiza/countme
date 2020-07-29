'use strict';

import {
    onValue,
    fetchData,
    registerToChildAdded,
    registerToChildChanged,
    registerToChildRemoved
} from "../../utils/generalDBUtils";
import * as actionTypes from "./actionTypes";

const playersReceived = (players) => {
    return {
        type: actionTypes.PLAYERS_RECEIVED,
        players
    };
};

const playerChanged = (id, value) => {
    return {
        type: actionTypes.PLAYER_CHANGED,
        id,
        value
    };
};

const playerAdded = (id, value) => {
    return {
        type: actionTypes.PLAYER_ADDED,
        id,
        value
    };
};

const playerRemoved = (id, value) => {
    return {
        type: actionTypes.PLAYER_REMOVED,
        id,
        value
    };
};

export const fetchPlayers  = () => fetchData('/players', playersReceived);
export const listenToPlayers  = () => onValue('/players', playersReceived);
export const registerForPlayerAdded  = () => registerToChildAdded('/players', playerAdded);
export const registerForPlayersChange  = () => registerToChildChanged('/players', playerChanged);
export const registerForPlayerRemoved  = () => registerToChildRemoved('/players', playerRemoved);
