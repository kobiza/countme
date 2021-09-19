import React from 'react';
import {
    ListItem,
    IconButton,
    ListItemText,
    ListItemSecondaryAction
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

function PlayerListItem (props) {
    return (
        <ListItem divider={props.divider} selected={props.isPlaying}>
            <ListItemText primary={props.name} />
            <ListItemSecondaryAction>
                <IconButton aria-label="Delete Todo" onClick={props.onButtonClick}>
                    <DeleteOutlined />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default PlayerListItem;
