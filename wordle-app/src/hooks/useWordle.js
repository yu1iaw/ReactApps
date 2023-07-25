import { useState } from "react"

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6).fill(null)]);
    const [history, setHistory] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState({});

    const formatGuess = () => {
        const solutionArr = [...solution.toLowerCase()];
        const formatedGuess = [...currentGuess.toLowerCase()].map(l => {
            return {key: l, color: "grey"}
        })
        formatedGuess.forEach((l, i) => {
            if (l.key === solutionArr[i]) {
                l.color = "green";
                solutionArr[i] = null;
            }
        })
        formatedGuess.forEach(l => {
            if (solutionArr.includes(l.key) && l.color !== "green") {
                l.color = "yellow";
                solutionArr[solutionArr.indexOf(l.key)] = null;
            }
        })
        // console.log(formatedGuess);
        return formatedGuess;
    }

    const addNewGuess = (formatedGuess) => {
        if (currentGuess.toLowerCase() === solution.toLowerCase()) {
            setIsCorrect(true);
        }
        setGuesses(prev => {
            let newGuesses = [...prev];
            newGuesses[turn] = formatedGuess;
            return newGuesses;
        })
        setHistory(prev => {
            return [...prev, currentGuess];
        })
        setTurn(prev => prev + 1);
        setUsedKeys(prev => {
            const newKeys = {...prev};
            formatedGuess.forEach(l => {
                let currentColor = newKeys[l.key];
                if (l.color === 'green') {
                    newKeys[l.key] = 'green';
                    return;
                }
                if (l.color === 'yellow' && currentColor !== "green") {
                    newKeys[l.key] = 'yellow';
                    return;
                }
                if (l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
                    newKeys[l.key] = 'grey';
                    return;
                }
            })
            return newKeys;
        })
        setCurrentGuess('');
    }

    const handleKeyup = (e) => {
        if (e.key === 'Enter'|| e.target.outerText === 'Enter') {
           
            if (turn > 5) return;
            if (history.includes(currentGuess)) return;
            if (currentGuess.length !== solution.length) return;
            
            const formated = formatGuess();
            addNewGuess(formated);
        }
        if (e.key === 'Backspace' || e.target.outerText === 'Backspace') {
            setCurrentGuess(prev => {
                return prev.slice(0, -1);
            })
            return;
        }
        if (/^[a-zA-Z]$/.test(e.key) || /^[a-zA-Z]$/.test(e.target.outerText)) {
            e.stopImmediatePropagation()
            if (currentGuess.length < solution.length) {
                setCurrentGuess(prev => {
                    if (e.key) {
                        return prev + e.key
                    } else if (e.target.outerText) {
                        return prev + e.target.outerText
                    }
                })
            }
        }
    }

    const reset = () => {
        setTurn(0);
        setIsCorrect(false);
        setGuesses([...Array(6).fill(null)]);
        setHistory([]);
        setUsedKeys({});
    }

    const getCitiesData = async () => {
        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", "WHRFTE0wWDJZWlpOa3M0SGI4V3RJcGE5OW9KZkJ4a1FwRWhwYU8xRA==");
      
        var requestOptions = {
          method: "GET",
          headers: headers,
          redirect: "follow",
        };

        const response = await fetch(`https://api.countrystatecity.in/v1/countries/GB/cities`, requestOptions);
        if (!response.ok) {
            throw new Error(`Could not fetch, status: ${response.status}`);
        }
        const res = await response.json();
        return res;
    }

    return {turn, currentGuess, guesses, usedKeys, isCorrect, handleKeyup, getCitiesData, reset};


}

export default useWordle;