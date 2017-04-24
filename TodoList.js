const {TodoItem} = window.App;




class TodoList extends React.Component{
	render() {
		const { 
			todos,
			onDeleteTodo,
			onToggleTodo
		} = this.props; 
		//接收從上個元件傳過來的參數

		const todoElements = todos.map((todo) => (

			<li key={todo.id}>
				<TodoItem
					title={todo.title}
					completed={todo.completed}
					onDelete={() => onDeleteTodo && onDeleteTodo(todo.id)}
					onToggle={(completed) => onToggleTodo && onToggleTodo(todo.id, completed)}
				/>
			</li>

		));


		return (
			<ul>{todoElements}</ul>
		);
	}
}

const _toggleTodo = (todos, id, completed) => {
	const target = todos.find((todo) => todo.id === id);
	if(target) target.completed = completed;
	return todos;
};

TodoList.propTypes = {
  todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onDeleteTodo: React.PropTypes.func,
  onToggleTodo: React.PropTypes.func
};


window.App.TodoList = TodoList;