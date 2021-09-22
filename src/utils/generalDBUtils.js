'use strict';

import * as DAL from './DAL';

export const onValue  = (path, action) => (dispatch) =>
    DAL.onValue(path, (snapshot) => {
        dispatch(action(snapshot.val()));
    });








