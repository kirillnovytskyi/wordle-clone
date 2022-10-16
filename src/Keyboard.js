import { createContext, useState } from 'react';
import { useKeyboard } from './hooks/useKeyboard';
import { KeyboardRow } from './KeyboardRow';

export const KeyboardContext = createContext({});

export const Keyboard = ({ checkGuess, setCells, addMessage }) => {
  const { inputHandler, deleteHandler, enterHandler } = useKeyboard(setCells, checkGuess, addMessage, gameOver);
  const [keysDisabled, setKeysDisabled] = useState(false);
  const keys = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

  function gameOver() {
    setKeysDisabled(true);
    setTimeout(() => window.location.reload(), 2000);
  };
  
  return (
    <section className="keyboard">
      {keys.map((kbRow, idx) => {
        return (
          <KeyboardContext.Provider key={idx} value={{
            disabled: keysDisabled
          }}>
            <KeyboardRow row={kbRow.split('')} rowIdx={idx} handlers={{
              inputHandler,
              deleteHandler,
              enterHandler
            }}/>
          </KeyboardContext.Provider>
        );
      })}
    </section>
  );
};