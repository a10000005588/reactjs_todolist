const {
	InputField,
	TodoHeader,
	TodoList
} = window.App;

// 4. 將 todos 定義於上層元件中：
//    因為資料來源有可能來自伺服器等，為了開發方便，先宣告於 TodoApp 中；
//    並讓下層元件 (TodoList) 只需理會上層元件遞送的 props 即可！


class TodoApp extends React.Component {

	constructor(props, context){
		super(props, context);
		 // 4. 將 todos 搬到 state 中：
	    //    放在 state 的好處是當使用 this.setState() 更新 todos 後，
	    //    React 會幫你重新 render，讓使用者看到最新的畫面。
	    //
	    //    PS. React 的資料模型分兩種：props、state，
	    //    你應該盡可能讓底層元件存取資料的方式是使用 props，
	    //    所以我們將 todos 儲存在上層元件 (TodoApp) 的 state 中。

	    this.state = {
	    	todos: [
				{
					id: 0,
					title: 'Item1',
					completed: false
				},{
					id: 1,
					title: 'Item2',
					completed: false
				},{
					id: 2,
					title: 'Item3',
					completed: false

				}
			]
	    };
	}

	render(){

		const {todos} = this.state;
		// var todos = this.state.todos
		return (
			<div>
				<TodoHeader 
					title="william's todo" 
					username="william" 
					todoCount={todos.filter((todo) => !todos.completed).length}
				/>
				<InputField 
					placeholder="請輸入待辦事項"
					onSubmitEditing ={
						(title) => this.setState({
							todos: _createTodo(todos, title)
						})
					}
				/>
				<TodoList 
					todos={todos}
					//呼叫 _deleteTodo 更新 Todo狀態
					onDeleteTodo= {
						(...args) => this.setState({
							todos: _deleteTodo(todos, ...args)
						})
					}
				/>
			</div>
		);
	}
}

//將刪除邏輯抽成一個function

const _deleteTodo = (todos, id) => {
	const idx = todos.findIndex((todo) => todo.id === id);

	//利用findIndext傳入todo.id  找出=== 點到的id  並作回傳
	//找不到傳回 -1

	if(idx !== -1) todos.splice(idx, 1); //將todos中點到的id做刪除
	return todos;
};

//將新增邏輯抽成一個function
const _createTodo = (todos, title) => {
	todos.push({
		id: todos[todos.length - 1].id + 1,
		title,
		completed: false
	});
	return todos;
}



window.App.TodoApp = TodoApp;