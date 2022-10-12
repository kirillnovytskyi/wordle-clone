import { Cell } from './Cell';

export const Row = ({ cells, rowColor}) => {
  return (
    <section className="row">
      {cells.map((cellValue, idx) => (
        <Cell value={cellValue} color={rowColor[idx]} key={idx}/>
      ))}
      <br />
    </section>
  );
};