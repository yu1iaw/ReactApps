import React from "react";
import nextId from "react-id-generator";

import "./app-task-add.css";

class AddTask extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			task: ''
		}
		this.id = nextId('1');
	}
	

	onValueChange = (e) => {
		this.setState({
			task: e.target.value
		})
	}

	onSubmit = (e) => {
		e.preventDefault();
		if (this.state.task.length < 5) return;
		this.props.onAdd(this.state.task, this.id++);
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
