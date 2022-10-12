import { useEffect, useState } from 'react';
import { Timer } from './Timer';

export const Keyboard = ({ checkGuess, setCells, cells, currentWord, setColors }) => {
  const [guess, setGuess] = useState('');
  const [kbInfo, setKbInfo] = useState('');
  const [currentRow, setCurrentRow] = useState(0);

  const msgTimer = new Timer();
  const keys = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

  const timerHandler = msg => {
    setKbInfo(msg);
    if (msgTimer.isStarted()) {
      console.log(msgTimer.isStarted());
      msgTimer.add(2000);
    } else {
      msgTimer.setTimeout(() => {
        console.log('End');
        setKbInfo('');
      }, 3000);
    }
  };

  const inputHandler = key => {
    if (guess.length < 5) {
      setGuess(curr => curr + key.toString());
    }
  };

  const enterHandler = () => {
    if (guess.length < 5) {
      timerHandler('Guess length less than 5!');
    } else {
      console.log('Guess: ', guess);
      let { msg, isAcceptable, colors, gameOver } = checkGuess(guess, currentWord);
      timerHandler(msg);
      if (isAcceptable) {
        setColors(curr => curr.map((el, idx) => idx === currentRow ? colors : el));
        if (currentRow === 5) gameOver = true; 
        if (gameOver) {
          console.log(colors);
          msg = colors[0] === 'lime' ? 'Win!' : 'Loss!'; 
          alert(msg + ' Answer is: ' + currentWord);
          window.location.reload();
        } else {
          setCurrentRow(curr => curr + 1);
        }
      }
    }
  };

  const deleteHandler = () => {
    setGuess(curr => {
      let newValue = curr.split('').map((el, idx, arr) => {
        if (idx === arr.length - 1) {
            return '';
        } else {
            return el;
        }
      }).join('');
      return newValue;
    });
  };

  useEffect(() => {
    let newRow = Array(5).fill('');
    guess.split('').forEach((char, idx) => {
      newRow[idx] = char;
    });
    setCells(curr => {
      curr[currentRow] = newRow;
      return [...curr];
    });
    console.log('New row: ', newRow);
  }, [guess]);

  useEffect(() => setGuess(''), [currentRow]);

  return (
    <section className="keyboard">
      {keys.map((kbRow, idx) => {
        return (
          <section className="kb-row" key={idx}>
            {idx === 2 ? <section className="kb-key extended" onClick={deleteHandler}>DEL</section> : null}
            {kbRow.split('').map((key, i) => {
              return (
                <section 
                  key={i}
                  className="kb-key" 
                  onClick={() => inputHandler(key)} 
                >
                  {key.toUpperCase()}
                </section>
              );
            })}
            {idx === 2 ? <section className="kb-key extended" onClick={enterHandler}>ENTER</section> : null}
          </section>
        );
      })}
      <p className="kb-info">{kbInfo}</p>
    </section>
  );
};