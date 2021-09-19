'use strict';

import * as DAL from './DAL.js';

export const onValue  = (path, action) => (dispatch, getState) =>
    DAL.onValue(path, (snapshot) => {
        dispatch(action(snapshot.val()));
    });








