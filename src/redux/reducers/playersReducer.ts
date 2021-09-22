"use strict";

import { PLAYERS_RECEIVED } from "../actions/actionTypes";
import { Player } from "../../types/Players";
import { AnyAction } from "@reduxjs/toolkit";

type PlayersState = Record<string, Player>;

const initialState: PlayersState = {};

export default function fbReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case PLAYERS_RECEIVED:
      return action.players;
    default:
      return state;
  }
}
