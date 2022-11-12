import React from "react";

import "./filter.css";

const Filter = (props) => {
	const btns = [
		{ name: "all", content: "Всі завдання" },
		{ name: "priority", content: "Першочергові" },
		{ name: "complete", content: "Виконані" },
	];

	const buttons = btns.map(({ name, content }) => {
        const active = props.filter === name;
        const clazz = active ? 'btn-light' : 'btn-outline-light';
		return (
			<button className={`btn ${clazz}`} type="button" key={name}
                    onClick={() => props.onFilterSelect(name)}>
				{content}
			</button>
		);
	});
	return (
		<div className="btn-group mt-3">
			{buttons}
		</div>
	);
};

export default Filter;
