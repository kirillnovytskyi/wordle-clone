import { useEffect, useState } from 'react';
import { MESSAGE_CORRECT, MESSAGE_INVALID, MESSAGE_VALID } from '../constants.js';
import { WORDS } from '../words.js';

export const useGuess = () => {
  const [word, setWord] = useState('');

  // Creating guess word
  useEffect(() => {
    const wordIndex = Math.floor(Math.random() * WORDS.length);
    const randomWord = WORDS[wordIndex];
    console.log('Current correct guess: ' + randomWord);
    setWord(randomWord);
  }, []);

  const checkGuess = (userGuess) => {
    const isInWordList = WORDS.includes(userGuess);

    if (!isInWordList) {
      return {
        message: MESSAGE_INVALID,
        isInWordList,
        colors: [],
        isGameOver: false
      };
    }

    if (userGuess === word) {
      return {
        message: MESSAGE_CORRECT,
        isInWordList,
        colors: Array(5).fill('lime'),
        isGameOver: true
      };
    }

    const charInfo = {}, mDCA = {}, cp = {}, metaData = { red: [], yellow: [], grey: [] };
    word.split('').forEach((char, idx) => cp[char] ? cp[char].push(idx) : cp[char] = [idx]);
  
    const addChar = (char, idx, type) => {
      charInfo[idx] = type;
      metaData[type].push(idx);
      mDCA[char]++;
    };
  
    for (let i = 0; i < word.length; i++) {
      const cC = word[i]; // correct char
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
        if (word.includes(gC)) {
          // correct char but in wrong spot
          mDCA[gC] < cp[gC].length ? addChar(gC, i, 'yellow') : addChar(gC, i, 'grey');
        } else {
          // wrong char
          addChar(gC, i, 'grey');
        }
      }
    }
  
    return {
      message: MESSAGE_VALID,
      isInWordList,
      colors: Object.values(charInfo),
      isGameOver: false
    };
  };

  return {
    word,
    checkGuess
  };
};