import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const EditTodoItemDialog = (props) => {
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onCloseDialog}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit to do</DialogTitle>
      <DialogContent>
        <TextField
          label="Edit to do item"
          variant="outlined"
          value={props.todoInputTextValue}
          onChange={props.onTodoInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            props.onEditTodoItem(props.index, props.todoInputTextValue)
          }
          color="primary">
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTodoItemDialog;
