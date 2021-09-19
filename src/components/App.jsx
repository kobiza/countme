'use strict';

import React from 'react';
import Players from './PlayersAddPage.jsx'
import { connect } from 'react-redux';
import RTL from './hoc/RTL.jsx';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {listenToPlayers} from '../redux/actions/playersAsyncActions'
import {listenToGuests} from '../redux/actions/guestsAsyncActions'

const mapDispatchToProps = (dispatch) => ({
    listenToPlayers: () => dispatch(listenToPlayers()),
    listenToGuests: () => dispatch(listenToGuests()),

});


class App extends React.Component {
    componentDidMount() {
        this.props.listenToPlayers()
        this.props.listenToGuests()
    }

    render() {
        const theme = createMuiTheme({
            direction: 'rtl',
        });
        return (
            <div className="index">
                <ThemeProvider theme={theme}>
                    <RTL>
                        <Players/>
                    </RTL>
                </ThemeProvider>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(App);
