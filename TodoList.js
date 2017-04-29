const {TodoItem} = window.App;




class TodoList extends React.Component{

//    使用 props 傳遞 callback 的好處是，可以不用在底層 view 元件中加入業務邏輯。
//
//    小筆記：讓 view 元件職責簡單，只需顯示 props 的資料，和呼叫 props 中相對應的 callback
	
	render() {
		const {
			todos,
			onUpdateTodo,
			onDeleteTodo,
			onToggleTodo
		} = this.props; 
		//接收從上個元件傳過來的參數

		const todoElements = todos.map((todo) => (

			<li key={todo.id}>
				<TodoItem
					title={todo.title}
					completed={todo.completed}
					onUpdate={(content) => onUpdateTodo && onUpdateTodo(todo.id, content)}
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

window.App.TodoList = TodoList;