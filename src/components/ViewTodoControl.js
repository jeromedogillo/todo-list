import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const ViewTodoControl = (props) => {
  return (
    <Grid item container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Button
          size="medium"
          color="secondary"
          variant="contained"
          onClick={() => props.onClickSaveFromViewTodo(props.todoObject)}>
          Back
        </Button>
      </Grid>
      <Grid item container xs={12} sm={4} justify="center">
        <Typography variant="h6">{props.todoObject.title}</Typography>
      </Grid>
      <Grid item container xs={12} sm={4} justify="flex-end">
        <Button
          size="medium"
          color="primary"
          variant="contained"
          onClick={() => props.onClickEditTodo(props.todoObject)}>
          Edit
        </Button>
      </Grid>
    </Grid>
  );
};

export default ViewTodoControl;
