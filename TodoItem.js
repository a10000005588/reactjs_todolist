const { InputField } = window.App;
//記得掛入 InputField 變數！！！

class TodoItem extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      editable:false
    };
 // 7. 在 ES6 component class 中，你必須手動綁定 this
    this.toggleEditMode = this.toggleEditMode.bind(this);

  }


  toggleEditMode() {
    //更新元件狀態來切換
    //當toggleEditMode被呼叫時 就會更新 editable的值 !this.state.editable 驚嘆號做 true <-->false
    this.setState({editable: !this.state.editable});
  }

  renderViewMode(){
    const { 
      title, 
      completed,
      onDelete,
      onToggle,
      onUpdate
    } = this.props;


    return (
      <div>
        <input type="checkbox" 
               checked={completed} 
               onChange={() => onToggle && onToggle(!completed)}
        />
        <span onDoubleClick={this.toggleEditMode}> {title} </span>
        <button onClick={() => onDelete && onDelete()}>x</button>
      </div>
    );
  }

  renderEditMode() {
    const { 
      title, 
      onSubmitEditing,
      onUpdate
    } = this.props;
    //const {title} = this.props;  
    //注意這裡下面的 toggleEditMode 
    //如果沒有在最上面 用bind() 綁定 那麼就得在每個function內做綁定的動作 非常麻煩！

    return (
      <InputField
        autoFocus  // 5. autoFocus 讓使用者切換到編輯模式後，可以立即編打
        placeholder="編輯待辦事項"
      // 1. 將 value 屬性改為 defaultValue：
      //    如果只給予 value，不給予 onChange callback，
      //    使用者輸入的資料將不會被更新，因此改為 defaultValue。
      // 2. 由於會改變元件的state狀態 故要用value 可控元件
        value={this.props.title}
        onBlur={this.toggleEditMode}  
        //當離開關注的地方 會執行toggleEditMode
        //onBlur會影響 "修改"按鍵無法執行

        onKeyDown={ (e) => { //使用者按下ESC 則切換為 瀏覽模式
          if (e.keyCode === 27) {
            e.preventDefault();
            this.toggleEditMode();

          }
        }}
      // 2. 傳遞 onSubmitEditing callback，該 callback 做兩件事情：
      //    a. 呼叫上層元件的 onUpdate callback
      //    b. 切換為「預覽模式」
        onSubmitEditing={(content) => {
           onUpdate && onUpdate(content);
           this.toggleEditMode();
        }}
        submitName="請按Enter鍵修改"
      />
    );
  }

  render() {

    return this.state.editable ? this.renderEditMode(): this.renderViewMode();

  }
}

window.App.TodoItem = TodoItem;