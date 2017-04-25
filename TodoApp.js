const {
	InputField,
	TodoHeader,
	TodoList
} = window.App;

// 4. 將 todos 定義於上層元件中：
//    因為資料來源有可能來自伺服器等，為了開發方便，先宣告於 TodoApp 中；
//    並讓下層元件 (TodoList) 只需理會上層元件遞送的 props 即可！

const _deleteTodo = (todos, id) => {
	const idx = todos.findIndex((todo) => todo.id === id);

	//利用findIndext傳入todo.id  找出=== 點到的id  並作回傳
	//找不到傳回 -1

	if(idx !== -1) todos.splice(idx, 1); //將todos中點到的id做刪除
	console.log("delete "+idx+"success");
	return todos;
};

//將新增邏輯抽成一個function
const _createTodo = (todos, title) => {

	console.log("createTodo");

	todos.push({
		id: todos[todos.length - 1].id + 1,
		title,
		completed: false
	});
	return todos;
};

//將編輯邏輯抽成一個function
const _updateTodo = (todos, id, title) => {
	const target = todos.find((todo) => todo.id === id);
	if(target) target.title = title;
	return todos;
};  //記得加分號 const 是ES6的變數宣告方法

const _toggleTodo = (todos, id, completed) => {
	const target = todos.find((todo) => todo.id === id);
	if(target) target.title = title;
	return todos;
};



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

	updateTodosBy(updateFn) {

		return (...args) => {
			this.setState({
				todos: updateFn(this.state.todos, ...args)
			});
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
					onSubmitEditing = {this.updateTodosBy(_createTodo)}

				/>

				 <TodoList
				 	todos={todos}
				 	onUpdateTodo={this.updateTodosBy(_updateTodo)}
				 	onToggleTodo={this.updateTodosBy(_toggleTodo)}
				 	onDeleteTodo={this.updateTodosBy(_deleteTodo)}
				 />
			</div>
		);
	}
}
/*
<TodoList 
todos={todos}
//呼叫 _deleteTodo 更新 Todo狀態
onDeleteTodo= {
	(...args) => this.setState({
		todos: _deleteTodo(todos, ...args)
	})
}
//呼叫 _updateTodo 更新todos狀態
onUpdateTodo ={
	(id,title) => this.setState({
		todos: _updataTodo(todos, id, state)
	})
}
*/ 
//改成統一用updateTodosBy()來取代上述寫法
//將刪除邏輯抽成一個function


window.App.TodoApp = TodoApp;