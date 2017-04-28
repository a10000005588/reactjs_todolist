const {connect} = ReactRedux;

const {
  TodoActions,
  TodoList
} = window.App;

//實作Comtainer Components
class TodoListContainer extends React.Component {

  render() {
    const {
      todos,
      updateTodo,
      toggleTodo,
      deleteTodo
    } = this.props;
    return (
      <TodoList
        todos={todos}
        onUpdateTodo={updateTodo}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
      />
    );
  }
}
//傳遞action物件 並用connect 傳給store
window.App.TodoListContainer = connect(
 (state) => ({ todos: state.todos }),
  {
      updateTodo: TodoActions.updateTodo,
      toggleTodo: TodoActions.toggleTodo,
      deleteTodo: TodoActions.deleteTodo
  }
)(TodoListContainer);