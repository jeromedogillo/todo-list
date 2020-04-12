import React from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const TodoList = (props) => {
  return (
    <List>
      {props.todoList.map((todo, i) => (
        <React.Fragment>
          <ListItem
            style={todo.isDone ? { textDecorationLine: 'line-through' } : {}}
            key={i}
            button={true}
            onClick={
              props.action === 'ACTION_VIEW_TODO'
                ? () => props.onClickToggle(i, !todo.isDone)
                : (event) => event.preventDefault()
            }>
            <ListItemText primary={todo.text} />
            {(props.action === 'ACTION_EDIT_TODO' ||
              props.action === 'ACTION_NEW_TODO') && (
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() =>
                    props.onClickEditTodoItemOnDialogOpen(todo.text, i)
                  }>
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => props.onClickRemoveTodoItem(i)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default TodoList;
