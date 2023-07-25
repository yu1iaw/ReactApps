import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import useWordle from '../hooks/useWordle';
import { Grid } from './Grid';
import { Keypad } from './Keypad';
import { Modal } from './Modal';

export const Wordle = ({solution, setSolution}) => {
    const [showModal, setShowModal] = useState(false);
    const {currentGuess, guesses, turn, isCorrect, usedKeys, handleKeyup, getCitiesData, reset} = useWordle(solution);
    
    useEffect(() => {
        window.addEventListener("keyup", handleKeyup);
        window.addEventListener("click", handleKeyup);
        let timeoutId;

        if (turn > 5 || isCorrect) {
            timeoutId = setTimeout(() => {setShowModal(true)}, 2500);
            window.removeEventListener("keyup", handleKeyup);
            window.removeEventListener("click", handleKeyup);
        }

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("keyup", handleKeyup);
            window.removeEventListener("click", handleKeyup);
        };
    }, [handleKeyup, turn, isCorrect])
    
  
    
    const onClose = async () => {       
        reset();
        try {
            const res = await getCitiesData();
            const dataArr = res.filter((city) => city.name.length <= 10 && !/\W/g.test(city.name.trim()));
            setSolution(dataArr[Math.floor(Math.random() * dataArr.length)].name);
        } catch (e) {
            console.log(e);
        } finally {
            setShowModal(false);
        }
    }
   
    return (
        <div>
            <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} solution={solution} />
            <Keypad usedKeys={usedKeys} solution={solution} />
            {showModal && createPortal(
                <Modal isCorrect={isCorrect} turn={turn} solution={solution} onClose={onClose} />,
                document.body
            )}
        </div>
    )
}