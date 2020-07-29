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
    <ListItem divider={props.divider}>
        <Checkbox
            onClick={props.onCheckBoxToggle}
            checked={props.checked}
            disableRipple
        />
        <ListItemText primary={props.name} />
        <ListItemSecondaryAction>
            <IconButton aria-label="Delete Todo" onClick={props.onButtonClick}>
                <DeleteOutlined />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
));

export default PlayerListItem;
