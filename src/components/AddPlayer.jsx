import React, { memo } from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

const AddPlayer = memo(props => (
    <Paper style={{ margin: 16, padding: 16 }}>
        <Grid container>
            <Grid xs={10} md={11} item style={{ paddingLeft: 16 }}>
                <TextField
                    placeholder="שם השחקן"
                    value={props.inputValue}
                    onChange={props.onInputChange}
                    onKeyPress={props.onInputKeyPress}
                    fullWidth
                />
            </Grid>
            <Grid xs={2} md={1} item>
                <Button
                    fullWidth
                    color="secondary"
                    variant="outlined"
                    onClick={props.onButtonClick}
                >
                    הוסף
                </Button>
            </Grid>
        </Grid>
    </Paper>
));

export default AddPlayer;
