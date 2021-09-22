import React, {useState} from 'react';
import _ from 'lodash'
import { useSelector } from 'react-redux'
import {pushPlayer, pushGuest, removePlayer, removeGuest, removeAllPlayers, removeAllGuests} from '../utils/playersDBUtils'
import Layout from './Layout'
import AddPlayer from './AddPlayer'
import PlayersList from './PlayersList'
import {Button} from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import Fab from '@material-ui/core/Fab';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import MuiAlert from '@material-ui/lab/Alert';
import {Player} from "../types/Players";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const getPlayerWithGuests = (name, numberOfGuests) => {
    const guests: Array<string> = []
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

type StoreState = {
    players: Record<string, Player>
    guests: Record<string, Player>
}

const PlayersAddPage: React.FC = () => {
    const [playerName, setPlayerName] = useState<string>('')
    const [copiedAlertOpen, setCopiedAlertOpen] = useState<boolean>(false)

    const players = useSelector<StoreState, StoreState['players']>((state) => state.players)
    const guests = useSelector<StoreState, StoreState['guests']>((state) => state.guests)

    const updatePlayerName = (event) => {
        setPlayerName(event.target.value);
    };

    const addPlayer = () => {
        const [players, guests] = getPlayersToAdd(playerName)
        _.forEach(players, playerName => pushPlayer({name: playerName}))
        _.forEach(guests, guestName => pushGuest({name: guestName}))

        setPlayerName('')
    };

    const addPlayerOnEnter = (event) => {
        if (event.which === 13 || event.keyCode === 13) {
            addPlayer()
            return true;
        }

        return false;
    }

    const [playersToPlay, guestsToPlay, onHold] = getPlayersToPlay(players, guests)
    const playingPlayers = playersToPlay.concat(guestsToPlay)

    const playingPlayersIds = _.reduce(playersToPlay, (acc, {id}) => {
        acc[id] = true

        return acc
    }, {})
    const playingGuestsIds = _.reduce(guestsToPlay, (acc, {id}) => {
        acc[id] = true

        return acc
    }, {})

    const cleanLists = () => {
        removeAllPlayers()
        removeAllGuests()
    }

    const copyToClipboard = (playingPlayers, onHold) => {
        const message = [
            `מגיעים (${playingPlayers.length}):`,
            playingPlayers.map(p => p.name).join(', '),
            `ממתינים (${onHold.length}):`,
            onHold.map(p => p.name).join(', ')
        ].join('\n')
        navigator.clipboard.writeText(message)
            .then(() => {
                setCopiedAlertOpen(true)
            })
            .catch(err => {
                // This can happen if the user denies clipboard permissions:
                console.error('Could not copy text: ', err);
            });

    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setCopiedAlertOpen(false)
    };

    return (
        <Layout>
            <AddPlayer
                inputValue={playerName}
                onInputChange={updatePlayerName}
                onButtonClick={addPlayer}
                onInputKeyPress={event => addPlayerOnEnter(event)}
            />
            <PlayersList
                items={players}
                playingIds={playingPlayersIds}
                onItemRemove={idx => removePlayer(idx)}
            />

            <PlayersList
                items={guests}
                playingIds={playingGuestsIds}
                onItemRemove={idx => removeGuest(idx)}
            />

            <Button
                fullWidth
                color="secondary"
                onClick={() => cleanLists()}
            >
                נקה
            </Button>

            <Fab
                color="secondary"
                aria-label="save"
                style={{position: 'fixed', bottom: '20px', left: '20px'}}
                onClick={() => copyToClipboard(playingPlayers, onHold)}
            >
                <LibraryBooksIcon/>
            </Fab>
            <Snackbar open={copiedAlertOpen} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="info">
                    ההודעה הועתקה
                </Alert>
            </Snackbar>
        </Layout>
    )

}

export default PlayersAddPage;
