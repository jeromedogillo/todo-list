import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as Constants from 'constants/Constants';

const AddEditTodoControl = (props) => {
  return (
    <React.Fragment>
      <Grid item container spacing={2}>
        <Grid item xs={12} sm={2}>
          <Button
            size="medium"
            color="secondary"
            variant="contained"
            onClick={() =>
              props.onClickChangeAction(
                props.action === Constants.ACTION_NEW_TODO
                  ? Constants.ACTION_MAIN_VIEW
                  : Constants.ACTION_VIEW_TODO
              )
            }>
            {props.action === Constants.ACTION_NEW_TODO ? 'Cancel' : 'Back'}
          </Button>
        </Grid>
        <Grid container item xs={12} sm={8} justify="flex-end">
          <TextField
            size="small"
            label="Title"
            variant="outlined"
            value={props.filenameText}
            onChange={props.onChangeFilenameInputChange}
          />
        </Grid>
        <Grid container item xs={12} sm={2} justify="flex-end">
          <Button
            size="medium"
            color="primary"
            variant="contained"
            onClick={() =>
              props.onClickSaveTodo(props.todoObject, props.action)
            }>
            Save
          </Button>
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid container item xs={12} sm={10} justify="flex-end">
          <TextField
            size="small"
            label="To do"
            variant="outlined"
            name="todoInputText"
            onChange={props.onChangeInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={2} container justify="flex-end">
          <Button
            disabled={!props.todoInputText}
            size="medium"
            color="primary"
            variant="contained"
            onClick={() => props.onClickAddTodoItem(props.todoInputText)}>
            Add
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AddEditTodoControl;
