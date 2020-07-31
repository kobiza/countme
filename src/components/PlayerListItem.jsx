import React, { memo } from "react";

import {
    List,
    ListItem,
    Checkbox,
    IconButton,
    ListItemText,
    ListItemSecondaryAction
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

const PlayerListItem = memo(props => (
    <ListItem divider={props.divider} selected={props.isPlaying}>
        <ListItemText primary={props.name} />
        <ListItemSecondaryAction>
            <IconButton aria-label="Delete Todo" onClick={props.onButtonClick}>
                <DeleteOutlined />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
));

export default PlayerListItem;
