"use strict";

import { GUESTS_RECEIVED } from "../actions/actionTypes";
import { Player } from "../../types/Players";
import { AnyAction } from "@reduxjs/toolkit";

type GuestsState = Record<string, Player>;

const initialState: GuestsState = {};

export default function fbReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case GUESTS_RECEIVED:
      return action.guests;
    default:
      return state;
  }
}
