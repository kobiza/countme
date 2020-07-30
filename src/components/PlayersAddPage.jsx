import React from 'react';
import { connect } from 'react-redux';
import {pushPlayer, pushGuest, removePlayer, removeGuest, removeAllPlayers, removeAllGuests} from '../utils/playersDBUtils.js'
import Layout from './Layout.jsx'
import AddPlayer from './AddPlayer.jsx'
import PlayersList from './PlayersList.jsx'
import {Button} from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

const getPlayerWithGuests = (name, numberOfGuests) => {
    const guests = []
    for (let i = 0 ; i < numberOfGuests; i++) {
        guests.push(`חבר של ${name} - ${i + 1}`)
    }

    return [[name], guests]
}

const getPlayersToAdd = (playerNameText) => {
    const cleanName = playerNameText.trim()
    if (cleanName.startsWith('חבר של') || cleanName.startsWith('מאוחר:')) {
        return [[], [cleanName]]
    }

    const parts = cleanName.split('+')
    if (parts.length === 1) {
        return [[parts[0]], []]
    }

    const [name, numberOfGuests] = parts.map(t => t.trim())

    return getPlayerWithGuests(name, numberOfGuests)
}

const getPlayersToPlay = (players, guests) => {
    const playersArr = _.toArray(_.mapValues(players, (item, id) => ({...item, id})))
    const guestsArr = _.toArray(_.mapValues(guests, (item, id) => ({...item, id})))

    const maxPlayers = 15
    if (playersArr.length >= maxPlayers) {
        return [playersArr.slice(0, maxPlayers), [], playersArr.slice(maxPlayers - 1).concat(guestsArr)]
    } else {
        const missPlayers = maxPlayers - playersArr.length
        return [playersArr, guestsArr.slice(0, missPlayers), guestsArr.slice(missPlayers)]
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

        this.cleanLists = () => {
            removeAllPlayers()
            removeAllGuests()
        }

        this.copyToClipboard = (e) => {
            this.textArea.select();
            document.execCommand('copy');
        }
    }

    render() {
        const [playersToPlay, guestsToPlay, onHold] = getPlayersToPlay(this.props.players, this.props.guests)
        const playingPlayers = playersToPlay.concat(guestsToPlay)
        const message = [
            `מגיעים (${playingPlayers.length}):`,
            playingPlayers.map(p => p.name).join(', '),
            `ממתינים (${onHold.length}):`,
            onHold.map(p => p.name).join(', ')
        ].join('\n')
        const playingPlayersIds = _.reduce(playersToPlay, (acc, {id}) => {
            acc[id] = true

            return acc
        }, {})
        const playingGuestsIds = _.reduce(guestsToPlay, (acc, {id}) => {
            acc[id] = true

            return acc
        }, {})

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
                    playingIds={playingPlayersIds}
                    onItemCheck={idx => this.checkPlayer(idx)}
                    onItemRemove={idx => this.removePlayer(idx)}
                />

                <PlayersList
                    items={this.props.guests}
                    playingIds={playingGuestsIds}
                    onItemCheck={idx => this.checkGuest(idx)}
                    onItemRemove={idx => this.removeGuest(idx)}
                />

                <Button
                    fullWidth
                    color="secondary"
                    onClick={() => this.cleanLists()}
                >
                    נקה
                </Button>

                <textarea
                    ref={(textarea) => this.textArea = textarea}
                    style={{position: 'fixed', top: '-1000px'}}
                    value={message}
                />

                <Fab
                    color="secondary"
                    aria-label="save"
                    style={{position: 'fixed', bottom: '20px', left: '20px'}}
                    onClick={this.copyToClipboard}
                >
                    <LibraryBooksIcon/>
                </Fab>
            </Layout>
        )
    }

}

export default connect(mapStateToProps)(PlayersAddPage);
