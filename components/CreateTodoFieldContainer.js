//從ReactRedux中引用connect;
const {connect} = ReactRedux;

const {
  TodoActions,
  InputField
} = window.App;

class CreateTodoFieldContainer extends React.Component {
  render() {
    return (
      <InputField
        placeholder="新增待辦清單"
        //onSubmitEditing={TodoActions.createTodo}
        //createTodoc函數改由父元件來
        onSubmitEditing={this.props.createTodo}
        submitName="新增"
      />
    );
  }
}

//window.App.CreateTodoFieldContainer = CreateTodoFieldContainer;

// 3. 使用 connect() 回傳的函數讓 Container 轉成另外一新元件（見學習筆記 1），而 connect() 的：
//    第一個參數是 mapStateToProps，這裡不需要從 Store 中取資料所以給 undefined。
//    第二個參數是 mapDispatchToProps，可以直接給 Action Creator 函數名稱，並定義鍵值為 props 的屬性名稱；
//    它會幫你將 createTodo 轉成 (...args) => store.dispatch(createTodo(...args))，
//    讓你調用該函數同時做兩件事，調用 Action Creator 和 dispatch action 物件。

window.App.CreateTodoFieldContainer = connect(undefined, {
  createTodo: TodoActions.createTodo
})(CreateTodoFieldContainer);

