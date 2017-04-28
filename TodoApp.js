
const {
  TodoActions,
  CreateTodoFieldContainer,
  TodoHeaderContainer,
  TodoListContainer
} = window.App;


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
	    	//初始資料改為從TodoStore 中拿取
	    	todos: TodoStore.getAll() 
	    };
		// 2. 實作 componentDidMount 方法：
		//    該方法在元件第一次 render 後，會被呼叫；

	}

	componentDidMount(){
		/*
    	let root = 'http://jsonplaceholder.typicode.com';
	//使用 ajax 請求 API：
	//並將取回的待辦資料更新元件 state（見下一步）
		fetch(root + '/todos')
			.then((response) => response.json())
			.then((todos) => this.setState({ todos }));
		
		fetch('./todos.json')
			.then((response) => response.json())
			.then((todos) => this.setState({ todos}));
		*/
		
		TodoActions.loadTodos();
		//向TodoStore 註冊監聽器:
		//當監聽器被觸發 便讓state and TodoStore資料同步
		// this._removeChangeListener = TodoStore.addChangeListener(
		// 	() => this.setState({ todos: TodoStore.getAll() })
		// );
    }

/*
    componentWillUnmount() {
    	//向TodoStore 註銷監聽器
    	this._removeChangeListener();
    }
*/
    //改由TodoStore做資料邏輯的處理

	// updateTodosBy(updateFn) {

	// 	return (...args) => {
	// 		this.setState({
	// 			todos: updateFn(this.state.todos, ...args)
	// 		});
	// 	};
	// }

 // 7. 所有渲染的資料從 state 中取，這份 state 與 TodoStore 是同步的；
 //    所有改變資料的操作都改為調用 TodoActions
	render(){

		const {todos} = this.state;
		// var todos = this.state.todos
		return (
			<div>
				// <TodoHeader 
				// 	title="William's todo" 
				// 	username="William" 
				// 	todoCount={todos.filter((todo) => !todo.completed).length}
				// />
				// <InputField 
				// 	placeholder="請輸入待辦事項"
				// 	onSubmitEditing = {TodoActions.createTodo}
				// 	submitName="新增"
				// />

				//  <TodoList
				//  	todos={todos}
				//  	onUpdateTodo={TodoActions.updateTodo}
				//  	onToggleTodo={TodoActions.toggleTodo}
				//  	onDeleteTodo={TodoActions.deleteTodo}
				//  />
				
				<TodoHeaderContainer />
		        <CreateTodoFieldContainer />
		        <TodoListContainer />
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
	/>
*/ 
//改成統一用updateTodosBy()來取代上述寫法
//將刪除邏輯抽成一個function

/*
	 TodoApp 與 Store 同步資料的 View，我們稱 Controller View；
	 而 TodoList, TodoHeader 等 View 
	 只單純的負責接收父元件傳遞的 props，並將它們顯示出來！
 */


window.App.TodoApp = TodoApp;