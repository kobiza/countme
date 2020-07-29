import React, { memo } from "react";
import { List, Paper } from "@material-ui/core";

import PlayerListItem from "./PlayerListItem.jsx";

const PlayersList = memo(props => {
    const itemsArr = _.mapValues(props.items, (item, id) => ({...item, id}))
    const items = _.toArray(itemsArr)
    return (
        <>
            {items.length > 0 && (
                <Paper style={{ margin: 16 }}>
                    <List style={{ overflow: "scroll" }}>
                        {items.map((player, idx) => (
                            <PlayerListItem
                                {...player}
                                key={`player.${player.id}`}
                                divider={idx !== items.length - 1}
                                onButtonClick={() => props.onItemRemove(player.id)}
                                onCheckBoxToggle={() => props.onItemCheck(player.id)}
                            />
                        ))}
                    </List>
                </Paper>
            )}
        </>
    )
});

export default PlayersList;
