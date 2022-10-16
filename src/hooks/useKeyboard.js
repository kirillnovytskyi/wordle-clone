import { useEffect, useState } from 'react';
import { MESSAGE_CORRECT, MESSAGE_INVALID_LENGTH } from '../constants';

export const useKeyboard = (setCells, checkGuess, addMessage, gameOver) => {
  const [guess, setGuess] = useState('');
  const [row, setRow] = useState(0);

  // cells units update
  useEffect(() => {
    const updatedRow = guess.split('').concat(Array(5 - guess.length).fill(''));
    setCells(curr => {
      curr.units[row] = updatedRow;
      return {...curr};
    });
  }, [guess, row, setCells]);

  // guess cleat on row update
  useEffect(() => setGuess(''), [row]);

  const inputHandler = key => {
    if (guess.length < 5) {
      setGuess(curr => curr + key.toString());
    }
  };

  const deleteHandler = () => {
    setGuess(curr => {
      let newValue = curr.split('').map((el, idx, arr) => {
        return idx === arr.length - 1 ? '' : el;
      }).join('');
      return newValue;
    });
  };

  const enterHandler = () => {
    if (guess.length < 5) {
      // Message: Guess length less than 5!
      addMessage(MESSAGE_INVALID_LENGTH);
      return 
    } 

    let { message, isInWordList, colors, isGameOver } = checkGuess(guess);
      if (!isInWordList) {
        addMessage(message);
        return
      }
      if (row === 5) {
        isGameOver = true;
        if (message !== MESSAGE_CORRECT) {
          message = 'Game Over!';
        }
      }; 
      addMessage(message);
      setCells(curr => {
        curr.colors[row] = colors;
        return {...curr};
      });
      if (isGameOver) {
        console.log(message, colors);
        gameOver();
      } else {
        setRow(curr => curr + 1);
      }
  };

  return {
    inputHandler,
    deleteHandler,
    enterHandler
  };
};