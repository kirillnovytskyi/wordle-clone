export const Message = ({ content, backgroundColor }) => {
  return (
    <section className="message" style={{
      backgroundColor
    }}>{content}</section>
  );
};