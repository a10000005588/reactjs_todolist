const {
	ActionTypes,
} = window.App;

/*
在實務中，Action 會由兩個角色相輔相成，Action Creator 和 action 物件：

action 物件用來描述改變資料的動作，會有 type 屬性區分動作
Action Creator 是一個函數，只負責兩件事情：
定義 action 物件
將 action 物件傳遞給 Dispatcher
*/


window.App.TodoActions = {
	loadTodos() {
		//在非同步的狀態中 可以等待有reponse時 在丟action物件

		//注意：同一個函數中，可以丟好幾個action物件
		//例如請求前丟一個，因為我們要將資料狀態改為loading:
		//請求成功或失敗，各丟不同的action!
		return(dispatch) => {
			fetch('./todos.json')
				.then((response) => response.json())
				.then((todos) => dispatch({
					type: ActionTypes.LOAD_TODOS_SUCCESS,
					todos
			}));
		};
 	},
 	createTodo(title){
		return {
			type: ActionTypes.CREATE_TODO,
			title
		};
	},
	updateTodo(id, title){
		return {
			type: ActionTypes.UPDATE_TODO,
			id,
			title
		};
	},
	toggleTodo(id, completed) {
		return {
			type: ActionTypes.TOGGLE_TODO,
			id,
			completed
		};
	},
	deleteTodo(id){
		return {
			type: ActionTypes.DELETE_TODO,
			id
		};  //注意加上 分號=_=
	}
};