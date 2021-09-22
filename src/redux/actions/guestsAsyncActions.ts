"use strict";

import { onValue } from "../../utils/generalDBUtils";
import * as actionTypes from "./actionTypes";
import { Player } from "../../types/Players";

const guestsReceived = (guests: Record<string, Player>) => {
  return {
    type: actionTypes.GUESTS_RECEIVED,
    guests,
  };
};

export const listenToGuests = () => onValue("/guests", guestsReceived);
