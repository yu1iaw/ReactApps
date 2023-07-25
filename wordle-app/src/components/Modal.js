import React from "react";

export const Modal = ({ isCorrect, turn, solution, onClose }) => {
	return (
		<div className="modal">
			{isCorrect && (
				<div className="container">
					<div className="innerBox">
						<h1>You Win!</h1>
						<p className="solution">{solution}</p>
						<p>You found the solution in {turn} {turn > 1 ? 'guesses' : 'guess'} 🚀</p>
						<span role="img" aria-label="cross" onClick={onClose}>&#10060;</span>
					</div>
				</div>
			)}
			{turn > 5 && !isCorrect && (
				<div className="container">
					<div className="innerBox">
						<h1>Nevermind!</h1>
						<p className="solution">{solution}</p>
						<p>Better luck next time <span role="img" aria-label="eyes">&#128064;</span></p>
						<span role="img" aria-label="cross" onClick={onClose}>&#10060;</span>
					</div>
				</div>
			)}

		</div>
	);
};
