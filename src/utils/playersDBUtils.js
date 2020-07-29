import _ from 'lodash';
import * as DAL from './DAL.js';


const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};

const getNewPlayerID = () => {
    return 'player-' + s4();
};

export const addPlayer = (playerData) => {
    const playerId = getNewPlayerID();
    const defaults = {
        payed: 0
    };
    const newPlayer = _.defaults(playerData, defaults);

    return DAL.setIn('/players/' + playerId, newPlayer);
};

// export const removePlayer = (playerId) => {
//     return DAL.remove('/players/' + playerId);
// };

export const removePlayer = (playerId) => {
    return DAL.setIn('/players/' + playerId, null);
};

export const removeAllPlayers = () => {
    return DAL.remove('/players/');
};



