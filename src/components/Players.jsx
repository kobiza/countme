import React from 'react';
import { connect } from 'react-redux';
import {addPlayer} from '../utils/playersDBUtils.js'

function mapStateToProps(state) {
    return {
        players: state.players
    };
}

class Players extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            playerName: ''
        };

        this.addPlayer = () => {
            addPlayer({name: this.state.playerName});
            this.setState({playerName: ''});
        };

        this.updatePlayerName = (event) => {
            this.setState({playerName: event.target.value});
        };

    }

    render() {
        const players = _.values(_.mapValues(this.props.players, (player, playerKey) => (
            <li key={playerKey}>{player.name}</li>
        )))

        return (
            <div className="players-container">
                <ul>
                    {players}
                </ul>
                <input type="text" value={this.state.playerName} onChange={this.updatePlayerName}/>
                <button onClick={this.addPlayer}>add</button>
            </div>
        );
    }

}

export default connect(mapStateToProps)(Players);
