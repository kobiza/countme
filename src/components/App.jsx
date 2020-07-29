'use strict';

import React from 'react';
import Players from './Players.jsx'
import { connect } from 'react-redux';
import {fetchPlayers, registerForPlayersChange, registerForPlayerAdded, registerForPlayerRemoved} from '../redux/actions/playersAsyncActions'

const mapDispatchToProps = (dispatch) => ({
    fetchPlayers: () => dispatch(fetchPlayers()),
    registerForPlayerAdded: () => dispatch(registerForPlayerAdded()),
    registerForPlayersChange: () => dispatch(registerForPlayersChange()),
    registerForPlayerRemoved: () => dispatch(registerForPlayerRemoved())
});


class App extends React.Component {
    componentDidMount() {
        this.props.fetchPlayers();
        this.props.registerForPlayerAdded();
        this.props.registerForPlayersChange();
        this.props.registerForPlayerAdded();
    }

    render() {
        return (
            <div className="index">
                <Players/>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(App);
