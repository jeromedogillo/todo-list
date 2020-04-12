import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import * as Constants from 'constants/Constants';
import EditTodoItemDialog from 'components/EditTodoItemDialog';
import MainList from 'components/MainList';
import TodoList from 'components/TodoList';
import ViewTodoControl from '../components/ViewTodoControl';
import AddEditTodoControl from '../components/AddEditTodoControl';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoInputText: '',
      filenameText: '',
      action: Constants.ACTION_MAIN_VIEW,
      list: [],
      tempTodoObject: {
        id: 0,
        title: '',
        todoList: []
      },
      // Edit Dialog variables
      isEditDialogOpen: false,
      editIndex: 0
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  handleChangeAction = (action) => {
    this.setState({ action: action });
  };

  // NEW TODO

  handleInputChange = (event) => {
    this.setState({ todoInputText: event.target.value });
  };

  handleFilenameInputChange = (event) => {
    this.setState({ filenameText: event.target.value });
  };

  handleNewTodo = () => {
    this.setState(
      (prevState) => ({
        filenameText: 'New ' + (prevState.list.length + 1),
        tempTodoObject: {
          ...prevState.tempTodoObject,
          id: prevState.list.length + 1,
          title: 'New ' + (prevState.list.length + 1),
          todoList: []
        }
      }),
      () => this.handleChangeAction(Constants.ACTION_NEW_TODO)
    );
  };

  handleAddTodoItem = (todoInputText) => {
    this.setState((prevState, prevProps) => ({
      tempTodoObject: {
        ...prevState.tempTodoObject,
        todoList: prevState.tempTodoObject.todoList.concat({
          text: todoInputText,
          isDone: false
        })
      }
    }));
  };
  // VIEW TODO

  handleViewTodo = (todoObject) => {
    this.setState({
      action: Constants.ACTION_VIEW_TODO,
      tempTodoObject: todoObject
    });
  };

  handleToggle = (index, isDone) => {
    this.setState((state, props) => ({
      tempTodoObject: {
        ...state.tempTodoObject,
        todoList: state.tempTodoObject.todoList.map((todo, i) =>
          i === index ? { ...todo, isDone } : todo
        )
      }
    }));
  };

  handleSaveFromViewTodo = (todoObject) => {
    this.setState(
      (state, props) => ({
        list: state.list.map((todo, index) =>
          todo.id === todoObject.id
            ? { ...todo, todoList: todoObject.todoList }
            : todo
        )
      }),
      () => this.handleChangeAction(Constants.ACTION_MAIN_VIEW)
    );
  };

  // EDIT TODO

  handleEditTodo = (todoObject) => {
    this.setState({
      action: Constants.ACTION_EDIT_TODO,
      tempTodoObject: todoObject,
      filenameText: todoObject.title
    });
  };

  handleEditTodoItem = (index) => {
    this.setState(
      (state, props) => ({
        tempTodoObject: {
          ...state.tempTodoObject,
          todoList: state.tempTodoObject.todoList.map((todo, i) =>
            i === index ? { ...todo, text: state.todoInputText } : todo
          )
        }
      }),
      () => this.handleCloseEditDialog()
    );
  };

  handleRemoveTodoItem = (index) => {
    this.setState((state, props) => ({
      tempTodoObject: {
        ...state.tempTodoObject,
        todoList: state.tempTodoObject.todoList.filter((todo, i) => i !== index)
      }
    }));
  };

  handleSaveTodo = (todoObject1, action) => {
    let todoObject = Object.assign(todoObject1);
    todoObject.title = this.state.filenameText;
    if (action === Constants.ACTION_NEW_TODO) {
      this.setState((state) => ({
        list: state.list.concat(todoObject),
        action: Constants.ACTION_MAIN_VIEW
      }));
    } else if (action === Constants.ACTION_EDIT_TODO) {
      this.setState({
        tempTodoObject: todoObject,
        action: Constants.ACTION_VIEW_TODO
      });
    }
  };

  handleEditTodoItemOnDialogOpen = (todoInputText, editIndex) => {
    this.setState({ todoInputText: todoInputText, editIndex: editIndex }, () =>
      this.handleOpenEditDialog()
    );
    return;
  };

  handleOpenEditDialog = () => {
    this.setState({ isEditDialogOpen: true });
  };

  handleCloseEditDialog = () => {
    this.setState({ isEditDialogOpen: false });
  };

  render() {
    return (
      <Grid container spacing={2}>
        {/* LEFT PANE */}
        <Grid item xs={6}>
          <MainList
            onClickNewTodo={this.handleNewTodo}
            ocClickViewTodo={this.handleViewTodo}
            list={this.state.list}
          />
        </Grid>

        {/* RIGHT PANE */}
        <Grid item xs={6}>
          <Paper>
            {this.state.action === 'ACTION_VIEW_TODO' && (
              <React.Fragment>
                <ViewTodoControl
                  onClickSaveFromViewTodo={this.handleSaveFromViewTodo}
                  todoObject={this.state.tempTodoObject}
                  onClickEditTodo={this.handleEditTodo}
                />
                <Grid item>
                  <TodoList
                    todoList={this.state.tempTodoObject.todoList}
                    action={this.state.action}
                    onClickToggle={this.handleToggle}
                  />
                </Grid>
              </React.Fragment>
            )}
            {/*  */}
            {(this.state.action === 'ACTION_EDIT_TODO' ||
              this.state.action === 'ACTION_NEW_TODO') && (
              <React.Fragment>
                <AddEditTodoControl
                  onClickChangeAction={this.handleChangeAction}
                  action={this.state.action}
                  filenameText={this.state.filenameText}
                  onChangeFilenameInputChange={this.handleFilenameInputChange}
                  onClickSaveTodo={this.handleSaveTodo}
                  todoObject={this.state.tempTodoObject}
                  todoInputText={this.state.todoInputText}
                  onChangeInputChange={this.handleInputChange}
                  onClickAddTodoItem={this.handleAddTodoItem}
                />
                <Grid item>
                  <TodoList
                    todoList={this.state.tempTodoObject.todoList}
                    action={this.state.action}
                    onClickEditTodoItemOnDialogOpen={
                      this.handleEditTodoItemOnDialogOpen
                    }
                    onClickRemoveTodoItem={this.handleRemoveTodoItem}
                  />
                </Grid>
                <EditTodoItemDialog
                  isOpen={this.state.isEditDialogOpen}
                  onCloseDialog={this.onCloseDialog}
                  todoInputTextValue={this.state.todoInputText}
                  onTodoInputChange={this.handleInputChange}
                  index={this.state.editIndex}
                  onEditTodoItem={this.handleEditTodoItem}
                />
              </React.Fragment>
            )}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default MainContainer;
