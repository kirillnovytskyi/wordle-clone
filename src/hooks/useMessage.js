import { useState } from 'react';
import { MESSAGE_CORRECT, MESSAGE_VALID } from '../constants';

export const useMessage = () => {
  const [messageList, setMessageList] = useState([]);

  const getColorByContent = content => {
    if (content === MESSAGE_CORRECT) return 'lime';
    if (content === MESSAGE_VALID) return 'orange';
    return 'red';
  };

  const addMessage = content => {
    const messageId = Date.now();
    const newMessage = [{id: messageId, content: content, backgroundColor: getColorByContent(content)}];
    setMessageList(curr => curr.concat(newMessage));
    setTimeout(() => {
      setMessageList(curr => curr.filter(message => message.id !== messageId));
    }, 3000);
  };


  return { messageList, addMessage };
};