import React from 'react';

export const Row = ({solution, guess, currentGuess}) => {
    const row = [...Array(solution.length)];

    if (guess) {
        return (
            <div className="row past">
                {guess.map((l, index) => {
                    return (
                        <div key={index} className={l.color}>{l.key}</div>
                    )
                })}
            </div>
        )
    }

    if (currentGuess) {
        const letters = [...currentGuess];
        return (
            <div className="row current">
                {letters.map((letter, i) => (
                    <div key={i} className="filled">{letter}</div>
                ))}
                {[...Array(solution.length - letters.length)].map((_v, i) => (
                    <div key={i}></div>
                ))}
            </div>
        )
    }
    
    return (
        <div className="row">
            { row.map((_el, i) => <div key={i}></div>) }
        </div>
    )
}