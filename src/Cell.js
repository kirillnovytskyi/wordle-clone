export const Cell = ({ value, color}) => {
  return (
    <section className="cell" style={{
      backgroundColor: color,
      borderColor: color.length ? color : '#000',
      color: color.length ? '#fff' : '#000'
    }}>{value.toUpperCase()}</section>
  );
};