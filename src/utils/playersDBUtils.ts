import * as DAL from "./DAL";
import { Player } from "../types/Players";

export const getNewPlayerData = (name: string): Player => {
  return {
    credits: 0,
    arrived: false,
    name,
  };
};

const _pushPlayer = (listName: string) => (newPlayer: Player) => {
  return DAL.push(`/${listName}/`, newPlayer);
};

const _removePlayer = (listName: string) => (playerId: string) => {
  return DAL.setIn(`/${listName}/` + playerId, null);
};

const _removeAllPlayers = (listName: string) => () => {
  return DAL.remove(`/${listName}/`);
};

export const pushPlayer = _pushPlayer("players");
export const removePlayer = _removePlayer("players");
export const pushGuest = _pushPlayer("guests");
export const removeGuest = _removePlayer("guests");
export const removeAllPlayers = _removeAllPlayers("players");
export const removeAllGuests = _removeAllPlayers("guests");
