import React, {useEffect} from 'react';
import Players from './PlayersAddPage'
import { useDispatch } from 'react-redux';
import RTL from './hoc/RTL';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import {listenToPlayers} from '../redux/actions/playersAsyncActions'
import {listenToGuests} from '../redux/actions/guestsAsyncActions'

const App: React.FC = () => {
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
