const {TodoItem} = window.App;

class TodoList extends React.Component{
	render() {
		const { 
			todos,
			onDeleteTodo
		 } = this.props; 
		//接收從上個元件傳過來的參數

		const todoElements = todos.map((todo) => (

			<li key={todo.id}>
				<TodoItem
					title={todo.title}
					completed={todo.completed}
					onDelete={() => onDeleteTodo && onDeleteTodo(todo.id)}
				/>
			</li>

		));


		return (
			<ul>{todoElements}</ul>
		);
	}
}

TodoList.propTypes = {
  todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onDeleteTodo: React.PropTypes.func
};


window.App.TodoList = TodoList;