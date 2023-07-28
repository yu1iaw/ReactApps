import React, { useEffect, useRef } from "react";

export const Modal = ({ isCorrect, turn, solution, onClose }) => {
	const myRef = useRef(null);

	useEffect(() => {
		const div = myRef.current;

		const onMobileHandler = (e) => {
			const touchLocation = e.targetTouches[0];
			div.style.left = touchLocation.pageX + 'px';
			div.style.top = touchLocation.pageY + 'px';
			div.style.width = '270px';
		}
		const onDesktopHandler = (e) => {
			if (e.target.tagName !== 'SPAN') {
				function moveAt(pageX, pageY) {
					div.style.left = pageX + 'px';
					div.style.top = pageY + 'px';
				}
				moveAt(e.pageX, e.pageY);  
	
				function onMouseMove(e) {
					div.style.width = '300px';
					moveAt(e.pageX, e.pageY);
				}
				document.addEventListener('mousemove', onMouseMove);
	
				div.onmouseup = function() {
					document.removeEventListener('mousemove', onMouseMove);
					div.onmouseup = null;
				};

				div.ondragstart = function() {
					return false;
				};	
			} else {
				onClose();
			}
		}
	
		div.addEventListener('touchmove', onMobileHandler)
		div.addEventListener('mousedown', onDesktopHandler)

		return () => {
			div.removeEventListener('touchmove', onMobileHandler);
			div.removeEventListener('mousedown', onDesktopHandler)
		}
		// eslint-disable-next-line
	}, [])


	return (
		<div className="modal">
			{isCorrect && (
				<div ref={myRef} className="container" draggable>
					<div className="innerBox">
						<h1>You Win!</h1>
						<p className="solution">{solution}</p>
						<p>You found the solution in {turn} {turn > 1 ? 'guesses' : 'guess'} 🚀</p>
						<span role="img" aria-label="cross" onClick={onClose}>&#10060;</span>
					</div>
				</div>
			)}
			{turn > 5 && !isCorrect && (
				<div ref={myRef} className="container" draggable>
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
