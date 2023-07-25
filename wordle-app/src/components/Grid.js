import React from "react";

import { Row } from "./Row";

export const Grid = ({ currentGuess, guesses, turn, solution }) => {
	return (
		<div>
			{guesses.map((guess, i) => {
                if (turn === i) {
                    return <Row key={i} currentGuess={currentGuess} solution={solution} />
                }
				return <Row key={i} guess={guess} solution={solution} />;
			})}
		</div>
	);
};
