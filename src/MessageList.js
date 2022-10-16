import { Message } from './Message';

export const MessageList = ({ messages }) => {
  return (
    <section className="message-list">
      {messages.map(message => {
        return (
          <Message 
            content={message.content} 
            backgroundColor={message.backgroundColor} 
            key={message.id}
          />
        );
      })}
    </section>
  );
};