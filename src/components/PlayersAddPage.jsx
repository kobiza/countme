import React from 'react';
import { connect } from 'react-redux';
import {pushPlayer, pushGuest, removePlayer, removeGuest, removeAllPlayers, removeAllGuests} from '../utils/playersDBUtils.js'
import Layout from './Layout.jsx'
import AddPlayer from './AddPlayer.jsx'
import PlayersList from './PlayersList.jsx'
import {Button} from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import Fab from '@material-ui/core/Fab';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


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
            playerName: '',
            copiedAlertOpen: false
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

        this.copyToClipboard = (playingPlayers, onHold) => {
            const message = [
                `מגיעים (${playingPlayers.length}):`,
                playingPlayers.map(p => p.name).join(', '),
                `ממתינים (${onHold.length}):`,
                onHold.map(p => p.name).join(', ')
            ].join('\n')
            navigator.clipboard.writeText(message)
                .then(() => {
                    this.setState({copiedAlertOpen: true})
                })
                .catch(err => {
                    // This can happen if the user denies clipboard permissions:
                    console.error('Could not copy text: ', err);
                });

        }

        this.handleCloseAlert = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }

            this.setState({copiedAlertOpen: false})
        };
    }

    render() {
        const [playersToPlay, guestsToPlay, onHold] = getPlayersToPlay(this.props.players, this.props.guests)
        const playingPlayers = playersToPlay.concat(guestsToPlay)

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
                    onItemRemove={idx => this.removePlayer(idx)}
                />

                <PlayersList
                    items={this.props.guests}
                    playingIds={playingGuestsIds}
                    onItemRemove={idx => this.removeGuest(idx)}
                />

                <Button
                    fullWidth
                    color="secondary"
                    onClick={() => this.cleanLists()}
                >
                    נקה
                </Button>

                <Fab
                    color="secondary"
                    aria-label="save"
                    style={{position: 'fixed', bottom: '20px', left: '20px'}}
                    onClick={() => this.copyToClipboard(playingPlayers, onHold)}
                >
                    <LibraryBooksIcon/>
                </Fab>
                <Snackbar open={this.state.copiedAlertOpen} autoHideDuration={6000} onClose={this.handleCloseAlert}>
                    <Alert onClose={this.handleCloseAlert} severity="info">
                        The message has been copied
                    </Alert>
                </Snackbar>
            </Layout>
        )
    }

}

export default connect(mapStateToProps)(PlayersAddPage);
