import './App.css';
import { Row } from './Row';
import { useState } from 'react';
import { Keyboard } from './Keyboard';
import { useGuess } from './hooks/useGuess';
import { useMessage } from './hooks/useMessage';
import { MessageList } from './MessageList';

function App() {
  const [cells, setCells] = useState({
    units: [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', '']
    ],
    colors: [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', '']
    ]
  });

  const { checkGuess } = useGuess();
  const { messageList, addMessage } = useMessage();

  return (
    <div className="wordle">
      <h1 className="heading">Wordle clone by kirillnovytskyi</h1>
      <div className="cells">
        {cells.units.map((row, idx) => (
          <Row cells={row} rowColor={cells.colors[idx]} key={idx}/>
        ))}
      </div>
      <Keyboard
        addMessage={addMessage}
        checkGuess={checkGuess}
        setCells={setCells} 
      />
      <MessageList messages={messageList}/>
    </div>
  );
}

export default App;
