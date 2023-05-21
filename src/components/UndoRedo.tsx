interface Props {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export const UndoRedo = (props: Props) => {
  return (
    <div>
      <button onClick={props.onUndo} disabled={!props.canUndo}>Undo</button>
      <button onClick={props.onRedo} disabled={!props.canRedo}>Redo</button>
    </div>
  );
}