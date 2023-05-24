import { Button } from '@mui/material';

interface Props {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export const UndoRedo = (props: Props) => {
  return (
    <div>
      <Button onClick={props.onUndo} disabled={!props.canUndo}>
        Undo
      </Button>
      <Button onClick={props.onRedo} disabled={!props.canRedo}>
        Redo
      </Button>
    </div>
  );
};
