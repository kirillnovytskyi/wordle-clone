import './App.css';
import { useEffect, useState } from 'react';
import { WORDS } from './words.js';
import { Row } from './Row';
import { Keyboard } from './Keyboard';

function App() {
  const [currentWord, setCurrentWord] = useState({
    value: null,
    idx: null
  });

  const [cells, setCells] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ]);

  const [colors, setColors] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ]);

  const checkGuess = (userGuess, correctGuess) => {
    const isAcceptable = WORDS.includes(userGuess);

    if (!isAcceptable) {
      return {
        msg: 'Not in the word list!',
        isAcceptable,
        colors: [],
        gameOver: false
      };
    }

    if (userGuess === correctGuess) {
      return {
        msg: 'Correct!',
        isAcceptable,
        colors: Array(5).fill('lime'),
        gameOver: true
      };
    }

    const charInfo = {}, mDCA = {}, cp = {}, metaData = { red: [], yellow: [], grey: [] };
    correctGuess.split('').forEach((char, idx) => cp[char] ? cp[char].push(idx) : cp[char] = [idx]);
  
    const addChar = (char, idx, type) => {
      charInfo[idx] = type;
      metaData[type].push(idx);
      mDCA[char]++;
    };
  
    for (let i = 0; i < correctGuess.length; i++) {
      const cC = correctGuess[i]; // correct char
      const gC = userGuess[i]; // guess char
      if (!mDCA[gC]) mDCA[gC] = 0; // default value to avoid errors
      
      if (cC === gC) {
        // in correct spot
        // Clearing space for correct char
        if (mDCA[gC] >= cp[gC].length) {
          const charIdx = metaData.yellow.indexOf(gC);
          metaData.yellow.splice(charIdx, 1);
          mDCA[gC]--;
        } 
        addChar(gC, i, 'red');
      } else {
        if (correctGuess.includes(gC)) {
          // correct char but in wrong spot
          mDCA[gC] < cp[gC].length ? addChar(gC, i, 'yellow') : addChar(gC, i, 'grey');
        } else {
          // wrong char
          addChar(gC, i, 'grey');
        }
      }
    }
  
    return {
      msg: 'In the word list!',
      isAcceptable,
      colors: Object.values(charInfo),
      gameOver: false
    };
  };

  // useEffect(() => {
  //   console.log(cells);
  // }, [cells]);
  
  useEffect(() => {
    setCurrentWord(() => {
      let randomIdx = Math.floor(Math.random() * WORDS.length);
      console.log('Current word: ' + WORDS[randomIdx]);
      return {
        value: WORDS[randomIdx],
        idx: randomIdx
      };  
    });
  }, []);

  return (
    <div className="wordle">
      <h1 className="heading">Wordle clone by kirillnovytskyi</h1>
      <div className="cells">
        {cells.map((row, idx) => (
          <Row cells={row} rowColor={colors[idx]} key={idx}/>
        ))}
      </div>
      <Keyboard 
        currentWord={currentWord.value} 
        checkGuess={checkGuess} 
        setColors={setColors}
        setCells={setCells} 
        cells={cells}
      />
    </div>
  );
}

export default App;
