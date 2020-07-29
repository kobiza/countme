import React from 'react';
import { connect } from 'react-redux';
import {addPlayer, removePlayer} from '../utils/playersDBUtils.js'
import Layout from './Layout.jsx'
import AddPlayer from './AddPlayer.jsx'
import PlayersList from './PlayersList.jsx'
import {pushPlayer} from "../utils/playersDBUtils";

function mapStateToProps(state) {
    return {
        players: state.players
    };
}

class PlayersAddPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            playerName: ''
        };

        this.addPlayer = () => {
            pushPlayer({name: this.state.playerName});
            this.setState({playerName: ''});
        };

        this.updatePlayerName = (event) => {
            this.setState({playerName: event.target.value});
        };

        this.removePlayer = (playerKey) => {
            removePlayer(playerKey)
        }

        this.checkPlayer = (playerKey) => {
            removePlayer(playerKey)
        }

        this.addPlayerOnEnter = (event) => {
            if (event.which === 13 || event.keyCode === 13) {
                this.addPlayer()
                return true;
            }

            return false;
        }
    }

    render() {
        return (
            <Layout>
                <AddPlayer
                    inputValue={this.state.playerName}
                    onInputChange={this.updatePlayerName}
                    onButtonClick={this.addPlayer}
                    onInputKeyPress={event => this.addPlayerOnEnter(event)}
                />
                <PlayersList
                    items={this.props.players}
                    onItemCheck={idx => this.checkPlayer(idx)}
                    onItemRemove={idx => this.removePlayer(idx)}
                />
            </Layout>
        )
    }

}

export default connect(mapStateToProps)(PlayersAddPage);
