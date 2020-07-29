import React from 'react';
import { connect } from 'react-redux';
import {pushPlayer, pushGuest, removePlayer, removeGuest} from '../utils/playersDBUtils.js'
import Layout from './Layout.jsx'
import AddPlayer from './AddPlayer.jsx'
import PlayersList from './PlayersList.jsx'
import {Button} from "@material-ui/core";

const forPlayWithGuests = (name, numberOfGuests) => {
    const guests = []
    for (let i = 0 ; i < numberOfGuests; i++) {
        guests.push(`חבר של ${name} - ${i + 1}`)
    }

    return [[name], guests]
}

const getPlayersToAdd = (playerNameText) => {
    const cleanName = playerNameText.trim()
    if (cleanName.startsWith('חבר של')) {
        return [[], [cleanName]]
    }

    const parts = cleanName.split('+')
    if (parts.length === 1) {
        return [[parts[0]], []]
    }

    const [name, numberOfGuests] = parts.map(t => t.trim())

    return forPlayWithGuests(name, numberOfGuests)
}

const getPlayersToPlay = (players, guests) => {
    const maxPlayers = 15
    if (players.length >= maxPlayers) {
        return [players.slice(0, maxPlayers), []]
    } else {
        const missPlayers = maxPlayers - players.length
        return [players, guests.slice(0, missPlayers)]
    }
}

function mapStateToProps(state) {
    return {
        players: state.players,
        guests: state.guests
    };
}

class PlayersAddPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            playerName: ''
        };

        this.addPlayer = () => {
            const [players, guests] = getPlayersToAdd(this.state.playerName)
            _.forEach(players, playerName => pushPlayer({name: playerName}))
            _.forEach(guests, guestName => pushGuest({name: guestName}))

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

        this.removeGuest = (playerKey) => {
            removeGuest(playerKey)
        }

        this.checkGuest = (playerKey) => {
            removeGuest(playerKey)
        }

        this.addPlayerOnEnter = (event) => {
            if (event.which === 13 || event.keyCode === 13) {
                this.addPlayer()
                return true;
            }

            return false;
        }

        this.copyPlayerList = () => {
            const players = _.toArray(this.props.players)
            const guests = _.toArray(this.props.guests)

            const [playersToPlay, guestsToPlay] = getPlayersToPlay(players, guests)

            console.log('קבועים:', playersToPlay.map(p => p.name).join(', '))
            console.log('אורחים:', guestsToPlay.map(p => p.name).join(', '))
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

                <PlayersList
                    items={this.props.guests}
                    onItemCheck={idx => this.checkGuest(idx)}
                    onItemRemove={idx => this.removeGuest(idx)}
                />

                <Button
                    fullWidth
                    color="secondary"
                    onClick={this.copyPlayerList}
                >
                    העתק
                </Button>
            </Layout>
        )
    }

}

export default connect(mapStateToProps)(PlayersAddPage);
