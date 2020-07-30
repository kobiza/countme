import _ from 'lodash';
import * as DAL from './DAL.js';

const _pushPlayer = (listName) => (playerData) => {
    const defaults = {
        payed: 0,
        arrived: false
    };
    const newPlayer = _.defaults(playerData, defaults);

    return DAL.push(`/${listName}/`, newPlayer);
};

const _removePlayer = (listName) => (playerId) => {
    return DAL.setIn(`/${listName}/` + playerId, null);
};

const _removeAllPlayers = (listName) => () => {
    return DAL.remove(`/${listName}/`);
};


export const pushPlayer = _pushPlayer('players')

export const removePlayer = _removePlayer('players')

export const pushGuest = _pushPlayer('guests')

export const removeGuest = _removePlayer('guests')

export const removeAllPlayers = _removeAllPlayers('players')
export const removeAllGuests = _removeAllPlayers('guests')




