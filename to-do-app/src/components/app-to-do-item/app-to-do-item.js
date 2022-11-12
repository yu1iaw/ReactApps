import React from "react";

import "./app-to-do-item.css";

const ToDoItem = (props) => {
	const { asap, done } = props;
	let className = "list-group-item d-flex justify-content-between";
	if (asap) {
		className += " asap";
	}
	if (done) {
		className += " done";
	}

	return (
		<li className={className}>
			<span
				tabIndex="0"
				className="list-group-item-label"
				onClick={props.onComplete}
				onKeyPress={(e) => {
					if (e.key === "Enter") {
						props.onComplete();
					}
				}}
				>
				{props.task}
			</span>
			<div className="d-flex align-items-center">
				<button type="button" className="btn-star btn-sm " onClick={props.onProgress}>
					<i className="fa-solid fa-star"></i>
				</button>
				<button type="button" className="btn-trash btn-sm " onClick={props.onRemove}>
					<i className="fa-solid fa-trash-can"></i>
				</button>
				<svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill="transparent">
					<path d="m11.917 30.458-9.625-9.625L4.5 18.625 11.917 26l2.208 2.25Zm7.833-.25-9.625-9.625 2.25-2.25 7.375 7.375L35.5 9.958l2.25 2.25Zm0-8.125-2.25-2.25 9.917-9.875 2.208 2.209Z" />
				</svg>
			</div>
		</li>
	);
};

export default ToDoItem;
