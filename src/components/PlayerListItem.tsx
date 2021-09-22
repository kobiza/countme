import React from "react";
import {
  ListItem,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

type Props = {
  divider: boolean;
  isPlaying: boolean;
  name: string;
  onButtonClick: () => void;
};

const PlayerListItem: React.FC<Props> = (props) => {
  return (
    <ListItem divider={props.divider} selected={props.isPlaying}>
      <ListItemText primary={props.name} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete Todo" onClick={props.onButtonClick}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default PlayerListItem;
