import { useContext } from 'react';
import { KeyboardContext } from './Keyboard';

export const KeyboardKey = ({ kbKey, onClick, extended = false }) => {
  const { disabled } = useContext(KeyboardContext);

  return (
    <button 
      className={extended ? 'kb-key extended' : 'kb-key'} 
      onClick={extended ? onClick : () => onClick(kbKey)} 
      disabled={disabled}
    >
      {kbKey.toUpperCase()}
    </button>
  );
};