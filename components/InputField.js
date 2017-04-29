class InputField extends React.Component {

	constructor(props, context){
		super(props, context);
		
		this.state = { 
			value: props.value || ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleButtonDown = this.handleButtonDown.bind(this);
	}

	//當使用者按下enter (keycode = 13)
	//呼叫上層傳遞的 onSubmitEditing callback
	//將資料傳遞給上層元件

	handleChange(e) {

		this.setState({value : e.target.value});
		//會改變你目前輸入的值
	}

	handleKeyDown(e){
		//會先將使用者輸入的值 用 handleChange 儲存在state.value中
		//然後在呼叫 handleKeyDown 來更新TodoApp.js中的 todos資料

		console.log(e.keyCode);  //keyCode的C 是大寫！！！！
		
		const {
			onKeyDown,
			onSubmitEditing
		} = this.props;

		//const { value } = e.target;
		const { value } = this.state;
		switch(e.keyCode) {
			case 13:
	     		//如果使用者都沒有鍵入任何內容 不會呼叫callback
				if(value.trim()){
					onSubmitEditing && onSubmitEditing(value);
				}

				//將輸入匡資料清空
				//e.target.value = '';
				this.setState({value: ''});
			break;
		}
		//如果上層元件傳遞 onKeyDown callback 我們必需觸發他

		//onKeyDown && onKeyDown(e);
	}

	handleButtonDown(){

		const {
			onSubmitEditing,
		} = this.props;
		const { value } = this.state;

		switch(this.props.submitName){
			// case '修改':
			// 		onSubmitEditing && onSubmitEditing(value);
				
			// 	break;
			case '新增':

				if(value.trim()){
					onSubmitEditing && onSubmitEditing(value);
				}

				this.setState({value: ''});
				break;
		
				//onKeyDown && onKeyDown(e);
		}
	}

	render() {
		return (
		 //...this.props將 上層元件的其他屬性 立榮TodoItem.js
	     //傳來的 autoFocus ,onBlur={this.toggleEditMode} , 
	     //注意這裡的onBlur的函式 由於是父元件的 所以要在最上面的
	     //constructor中 用super來繼承 才能使用！
			<div>
				<input  //這裡有問題
					   type="text" 
					   value={this.state.value}
					   onChange={this.handleChange}
					   //傾聽 input的 onKeyDown事件
					   onKeyDown = {this.handleKeyDown}
					   //當按下任何按鍵做觸發
				/>
				<button onClick={this.handleButtonDown}>{this.props.submitName}</button>
			</div>
		);
	}
}

window.App.InputField = InputField;