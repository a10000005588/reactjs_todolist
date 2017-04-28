const { createStore, combineReducers, applyMiddleware } = Redux;
const { Provider } = ReactRedux;
const { TodoApp, reducers } = window.App;
//將reducers 集合物件 轉換成一個reducer function
const composedReducer = combineReducers(reducers);


const thunkMiddleware = ({ dispatch, getState }) => {
	//在action callback函數在傳入一個next funciton
	//判斷action 不是為thuck 把action用next 交給下一個middleware
	return (next) => (action) => {
		//判斷 action 是否為thunk function,是的話執行它 
		//並將thuck函數傳進去
		if(typeof action === 'function') {
			return action(dispatch, getState);
		}
		//如果action 不是thunk 將action交給下一個 middleware
		return next(action);
	};
};
//使用reducer函數 建立Store實例，Store會將改變狀態邏輯 委託給reducer實作
const store = createStore(
	composedReducer,
	//將middleware 依序傳遞進applyMiddleware
	//將回傳的enhancer function傳給 createStore
	applyMiddleware(thunkMiddleware)
);
//將原本 index.html 中的程式碼移來這裡，記得移除原本的
ReactDOM.render(
	<Provider store={store}>
		<TodoApp />
	</Provider>,
	document.getElementById('app')
);