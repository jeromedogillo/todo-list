import React from 'react';
import {
  Grid,
  Divider,
  Paper,
  FormControl,
  FormGroup
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const MainList = (props) => {
  return (
    <Paper>
      <Grid item>
        <FormGroup>
          <FormControl>
            <Button
              size="medium"
              color="primary"
              variant="contained"
              onClick={props.onClickNewTodo}>
              New
            </Button>
          </FormControl>
        </FormGroup>
      </Grid>
      <Grid item>
        <List>
          {props.list.map((listItem, index) => (
            <React.Fragment>
              <ListItem
                key={index}
                button={true}
                onClick={() => props.ocClickViewTodo(listItem)}>
                <ListItemText primary={listItem.title} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Grid>
    </Paper>
  );
};

export default MainList;
