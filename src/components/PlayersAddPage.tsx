import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useState,
} from "react";
import _ from "lodash";
import {
  pushPlayer,
  pushGuest,
  removePlayer,
  removeGuest,
  removeAllPlayers,
  removeAllGuests,
  getNewPlayerData,
} from "../utils/playersDBUtils";
import Layout from "./Layout";
import AddPlayer from "./AddPlayer";
import PlayersList from "./PlayersList";
import { Button, SnackbarProps } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import Fab from "@material-ui/core/Fab";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";

import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useAppSelector } from "./hooks/reduxHooks";
import { RootState } from "../redux/store";
import { Player } from "../types/Players";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const getPlayerWithGuests = (name: string, numberOfGuests: number) => {
  const guests: Array<string> = [];
  for (let i = 0; i < numberOfGuests; i++) {
    guests.push(`חבר של ${name} - ${i + 1}`);
  }

  return [[name], guests];
};

const getPlayersToAdd = (playerNameText: string) => {
  const cleanName = playerNameText.trim();
  if (cleanName.startsWith("חבר של") || cleanName.startsWith("מאוחר:")) {
    return [[], [cleanName]];
  }

  const parts = cleanName.split("+");
  if (parts.length === 1) {
    return [[parts[0]], []];
  }

  const [name, numberOfGuestsStr] = parts.map((t) => t.trim());
  const numberOfGuests = Number(numberOfGuestsStr) || 0;

  return getPlayerWithGuests(name, numberOfGuests);
};

type PlayerWithId = Player & {
  id: string;
};

const getPlayersToPlay = (
  players: RootState["players"],
  guests: RootState["guests"]
): [Array<PlayerWithId>, Array<PlayerWithId>, Array<PlayerWithId>] => {
  const playersArr = _.toArray(
    _.mapValues(players, (item, id) => ({ ...item, id }))
  );
  const guestsArr = _.toArray(
    _.mapValues(guests, (item, id) => ({ ...item, id }))
  );

  const maxPlayers = 15;
  if (playersArr.length >= maxPlayers) {
    return [
      playersArr.slice(0, maxPlayers),
      [],
      playersArr.slice(maxPlayers - 1).concat(guestsArr),
    ];
  } else {
    const missPlayers = maxPlayers - playersArr.length;
    return [
      playersArr,
      guestsArr.slice(0, missPlayers),
      guestsArr.slice(missPlayers),
    ];
  }
};

const PlayersAddPage: React.FC = () => {
  const [playerName, setPlayerName] = useState<string>("");
  const [copiedAlertOpen, setCopiedAlertOpen] = useState<boolean>(false);

  const players = useAppSelector((state) => state.players);
  const guests = useAppSelector((state) => state.guests);

  const updatePlayerName: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPlayerName(event.target.value);
  };

  const addPlayer = () => {
    const [players, guests] = getPlayersToAdd(playerName);
    _.forEach(players, (playerName) =>
      pushPlayer(getNewPlayerData(playerName))
    );
    _.forEach(guests, (guestName) => pushGuest(getNewPlayerData(guestName)));

    setPlayerName("");
  };

  const addPlayerOnEnter: KeyboardEventHandler = (event) => {
    if (event.which === 13 || event.keyCode === 13) {
      addPlayer();
      return true;
    }

    return false;
  };

  const [playersToPlay, guestsToPlay, onHold] = getPlayersToPlay(
    players,
    guests
  );
  const playingPlayers = playersToPlay.concat(guestsToPlay);

  const playingPlayersIds = _.reduce<PlayerWithId, Record<string, true>>(
    playersToPlay,
    (acc, { id }) => {
      acc[id] = true;

      return acc;
    },
    {}
  );
  const playingGuestsIds = _.reduce<PlayerWithId, Record<string, true>>(
    guestsToPlay,
    (acc, { id }) => {
      acc[id] = true;

      return acc;
    },
    {}
  );

  const cleanLists = () => {
    removeAllPlayers();
    removeAllGuests();
  };

  const copyToClipboard = (
    playingPlayers: Array<PlayerWithId>,
    onHold: Array<PlayerWithId>
  ) => {
    const message = [
      `מגיעים (${playingPlayers.length}):`,
      playingPlayers.map((p) => p.name).join(", "),
      `ממתינים (${onHold.length}):`,
      onHold.map((p) => p.name).join(", "),
    ].join("\n");
    navigator.clipboard
      .writeText(message)
      .then(() => {
        setCopiedAlertOpen(true);
      })
      .catch((err) => {
        // This can happen if the user denies clipboard permissions:
        console.error("Could not copy text: ", err);
      });
  };

  const handleCloseSnackbar: SnackbarProps["onClose"] = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setCopiedAlertOpen(false);
  };

  const handleCloseAlert: AlertProps["onClose"] = () => {
    setCopiedAlertOpen(false);
  };

  return (
    <Layout>
      <AddPlayer
        inputValue={playerName}
        onInputChange={updatePlayerName}
        onButtonClick={addPlayer}
        onInputKeyPress={(event) => addPlayerOnEnter(event)}
      />
      <PlayersList
        items={players}
        playingIds={playingPlayersIds}
        onItemRemove={(idx) => removePlayer(idx)}
      />

      <PlayersList
        items={guests}
        playingIds={playingGuestsIds}
        onItemRemove={(idx) => removeGuest(idx)}
      />

      <Button fullWidth color="secondary" onClick={() => cleanLists()}>
        נקה
      </Button>

      <Fab
        color="secondary"
        aria-label="save"
        style={{ position: "fixed", bottom: "20px", left: "20px" }}
        onClick={() => copyToClipboard(playingPlayers, onHold)}
      >
        <LibraryBooksIcon />
      </Fab>
      <Snackbar
        open={copiedAlertOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseAlert} severity="info">
          ההודעה הועתקה
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default PlayersAddPage;
