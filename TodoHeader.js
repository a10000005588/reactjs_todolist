

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

window.App.TodoHeader = TodoHeader;