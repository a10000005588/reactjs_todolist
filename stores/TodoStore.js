/*這支程式要負責：

管理 todos 資料
存放 create, update, toggle, delete 等改變 todos 的業務邏輯
提供 View 註冊和註銷資料改變事件
向 AppDispatcher 註冊 callback，callback 根據 ActionTypes(LOAD_TODOS_SUCCESS, CREATE_TODO, ...) 做不同的事
當 todos 改變，觸發改變事件
提供 getter API 回傳 todos */

const {
  ActionTypes,
  AppDispatcher
} = window.App;

const CHANGE_EVENT = 'CHANGE';
const _emitter = new EventEmitter();

//管理todos 資料
let _todos = [];

//原本放在TodoApp 中的業務邏輯，放到Store中;
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
	if(target) target.completed = completed;
	return todos;
};

window.App.TodoStore = {
	//回傳 todos 陣列
	getAll() {
		return _todos;
	},

	//提供註冊改變事件的API，並回傳註銷函數
	addChangeListerner(callback) {
		_emitter.on(CHANGE_EVENT, callback);
		return () => _emitter.removeListener(CHANGE_EVENT, callback);
	},

	dispatchToken: AppDispatcher.register((action) => {
		switch(action.type){
			case ActionTypes.LOAD_TODOS_SUCCESS:
				_todos = action.todos;
				_emitter.emit(CHANGE_EVENT);//當資料改變 必須觸發事件
				break;
			case ActionTypes.CREATE_TODO:
				_todos = _createTodo(_todos, action.title);
				_emitter.emit(CHANGE_EVENT);
				break;
			case ActionTypes.UPDATE_TODO:
				_todos = _updateTodo(_todos, action.id, action.title);
				_emitter.emit(CHANGE_EVENT);
				break;
			case ActionTypes.TOGGLE_TODO:
				_todos = _toggleTodo(_todos, action.id, action.completed);
				_emitter.emit(CHANGE_EVENT);
				break;
			case ActionTypes.DELETE_TODO:
				_todos = _deleteTodo(_todos, action.id);
				_emitter.emit(CHANGE_EVENT);
				break;
		}
	})
};
