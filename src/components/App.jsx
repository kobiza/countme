import React, {useEffect} from 'react';
import Players from './PlayersAddPage.jsx'
import { useDispatch } from 'react-redux';
import {listenToPlayers} from '../redux/actions/playersAsyncActions'
import {listenToGuests} from '../redux/actions/guestsAsyncActions'

function App () {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listenToPlayers())
        dispatch(listenToGuests())
    }, [dispatch])

    return (
        <div className="index">
            <Players/>
        </div>
    );
}

export default App;
