class InputField extends React.Component {

	constructor(props, context){
		super(props, context);
		
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	//當使用者按下enter (keycode = 13)
	//呼叫上層傳遞的 onSubmitEditing callback
	//將資料傳遞給上層元件

	handleKeyDown(e){
		const {
			onKeyDown,
			onSubmitEditing
		} = this.props;

		const { value } = e.target;
		switch(e.keycode) {
			case 13:
			//如果使用者都沒有鍵入任何內容 部會呼叫callback
			if(value.trim()){
				onSubmitEditing && onSubmitEditing(value);
			}

			//將輸入匡資料清空
			e.target.value = '';
			break;
		}
		//如果上層元件傳遞 onKeyDown callback 我們必需觸發他

		onKeyDown && onKeyDown(e);
	}

	render() {
		return (
			<input {...this.props} 
				   type="text" 
				   //傾聽 input的 onKeyDown事件
				   onKeyDown = {this.handleKeyDown}
			/>
		);
	}
}

InputField.propTypes = {
	onSubmitEditing: React.PropTypes.func
};

window.App.InputField = InputField;