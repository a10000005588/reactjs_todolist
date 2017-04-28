

class TodoHeader extends React.Component {
	render() {

		const {
			title,
			username,
			todoCount
		} = this.props;

 		console.log(this.props);
		return(
			<div>
				<h1>{title}</h1>
				<span>哈囉，{username}: 你有 {todoCount}項事情未完成</span>
			</div>
		);
	}
}

TodoHeader.propTypes = {
	title: React.PropTypes.string,  //注意這裡的PropTypes P為大寫
	username: React.PropTypes.string,
	todoCount: React.PropTypes.number
};

TodoHeader.defaultProps = {
	title: '我的代辦清單',
	username: 'Guest',
	todoCount: 0
};



window.App.TodoHeader = TodoHeader;