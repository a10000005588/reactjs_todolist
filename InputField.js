class InputField extends React.Component {

	constructor(props, context){
		super(props, context);
		
		this.state = { value: props.value || ''};
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
			onSubmitEditing
		} = this.props;


		const { value } = this.state;
		if(value.trim()){
			onSubmitEditing && onSubmitEditing(value);
		}

		this.setState({value: ''});

		//onKeyDown && onKeyDown(e);
	}

	render() {
		return (
			<div>
				<input {...this.props} 
					   type="text" 
					   value={this.state.value}
					   onChange={this.handleChange}
					   //傾聽 input的 onKeyDown事件
					   onKeyDown = {this.handleKeyDown}
					   //當按下任何按鍵做觸發
				/>
				<button onClick={this.handleButtonDown}>新增</button>
			</div>
		);
	}
}

InputField.propTypes = {
	onSubmitEditing: React.PropTypes.func
};

window.App.InputField = InputField;