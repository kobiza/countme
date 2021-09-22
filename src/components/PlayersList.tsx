import React from "react";
import _ from "lodash";
import { List, Paper } from "@material-ui/core";

import PlayerListItem from "./PlayerListItem";
import { Player } from "../types/Players";

type Props = {
  items: Record<string, Player>;
  playingIds: Record<string, true>;
  onItemRemove: (playerId: string) => void;
};

const PlayersList: React.FC<Props> = (props) => {
  const itemsArr = _.mapValues(props.items, (item, id) => ({ ...item, id }));
  const items = _.toArray(itemsArr);
  return (
    <>
      {items.length > 0 && (
        <Paper style={{ margin: 16 }}>
          <List>
            {items.map((player, idx) => (
              <PlayerListItem
                {...player}
                key={`player.${player.id}`}
                isPlaying={props.playingIds[player.id]}
                divider={idx !== items.length - 1}
                onButtonClick={() => props.onItemRemove(player.id)}
              />
            ))}
          </List>
        </Paper>
      )}
    </>
  );
};

export default PlayersList;
