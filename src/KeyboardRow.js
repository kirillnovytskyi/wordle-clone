import { KeyboardKey } from './KeyboardKey';

export const KeyboardRow = ({ row, rowIdx, handlers }) => {
  return (
    <section className="kb-row">
      {rowIdx === 2 && <KeyboardKey kbKey={'delete'} onClick={handlers.deleteHandler} extended={true} />}
      {row.map(kbKey => {
        return (
          <KeyboardKey key={kbKey} kbKey={kbKey} onClick={handlers.inputHandler} />
        );
      })}
      {rowIdx === 2 && <KeyboardKey kbKey={'enter'} onClick={handlers.enterHandler} extended={true} />}
    </section>
  );
};