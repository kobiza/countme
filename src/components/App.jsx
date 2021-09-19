import React, {useEffect} from 'react';
import Players from './PlayersAddPage.jsx'
import { useDispatch } from 'react-redux';
import RTL from './hoc/RTL.jsx';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import {listenToPlayers} from '../redux/actions/playersAsyncActions'
import {listenToGuests} from '../redux/actions/guestsAsyncActions'

function App () {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listenToPlayers())
        dispatch(listenToGuests())
    }, [dispatch])

    const theme = createTheme({
        direction: 'rtl',
    });

    return (
        <div className="index" dir="rtl">
            <ThemeProvider theme={theme}>
                <RTL>
                    <Players/>
                </RTL>
            </ThemeProvider>
        </div>
    );
}

export default App;
