'use strict';

import * as DAL from './DAL';
import {AppDispatch} from "../redux/store";
import {AnyAction} from "@reduxjs/toolkit";

export const onValue  = (path: string, action: (data: any) => AnyAction) => (dispatch: AppDispatch) =>
    DAL.onValue(path, (snapshot) => {
        dispatch(action(snapshot.val()));
    });








