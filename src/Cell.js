export const Cell = ({ value, color}) => {
  return (
    <section className="cell" style={{
      backgroundColor: color,
      color: color.length ? '#fff' : '#000'
    }}>{value.toUpperCase()}</section>
  );
};