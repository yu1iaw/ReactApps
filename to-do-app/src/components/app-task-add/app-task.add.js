import React from "react";
import 'animate.css';

import "./app-task-add.css";

class AddTask extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			task: ''
		}
		this.myRef = React.createRef();
	}
	
	onValueChange = (e) => {
		if (e.target.value === '') this.myRef.current.style.backgroundColor = '';
		else if (e.target.value.length < 5 || e.target.value.length > 50 || (window.screen.width < 500 && e.target.value.length > 45)) {
			this.myRef.current.style.backgroundColor = '#ff6666';
		} else {
			this.myRef.current.style.backgroundColor = '';
		}

		this.setState({
			task: e.target.value
		})
	}

	onSubmit = (e) => {
		e.preventDefault();
		if (this.state.task.length < 5 || this.state.task.length > 50 || (window.screen.width < 500 && this.state.task.length > 45)) {
			this.myRef.current.classList.add('animate__animated', 'animate__shakeX');
			this.myRef.current.style.backgroundColor = '#ff6666';
			return;
		} else {
			this.myRef.current.classList.remove('animate__animated', 'animate__shakeX');
		}
		this.props.onAdd(this.state.task, Math.floor(Math.random() * (1000 - 7) + 7));
		this.setState({
			task: ''
		})
	}

	render() {
		return (
			<div className="app-add-form shadow">
				<h3>Додати завдання</h3>
				<form className="add-form mt-4 d-flex" onSubmit={this.onSubmit}>
					<input type="text"
						   ref={this.myRef}
						   className="form-control new-post-label"
						   placeholder="Ти зможеш все :)"
						   value={this.state.task}
						   onChange={this.onValueChange} />
					<button type="submit" className="btn btn-outline-light">
						Додати
					</button>
				</form>
			</div>
		);
	}
};

export default AddTask;
