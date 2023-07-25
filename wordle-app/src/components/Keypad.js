import React, { useState } from 'react';


const keys = [{"key": "a"},{"key": "b"},{"key": "c"},{"key": "d"},{"key": "e"},{"key": "f"},{"key": "g"},{"key": "h"},{"key": "i"},{"key": "j"},{"key": "k"},{"key": "l"},{"key": "m"},{"key": "n"},{"key": "o"},{"key": "p"},{"key": "q"},{"key": "Backspace"},{"key": "r"},{"key": "s"},{"key": "t"},{"key": "u"},{"key": "v"},{"key": "w"},{"key": "x"},{"key": "y"},{"key": "z"}, {"key": "Enter"}];

export const Keypad = ({usedKeys}) => {
    const [letters] = useState(keys);
    
    return (
        <div className="keypad">
            {letters.map(l => {
                let color;
                if (l.key !== 'Backspace' && l.key !== 'Enter') {
                    color = usedKeys[l.key];
                }
                return (
                    <div key={l.key} className={l.key !== 'Backspace' && l.key !== 'Enter' ? color : "funcBtns"}>{l.key}</div>
                ) 
            })}
        </div>
    )
}