import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export const UndoRedo = (props: Props) => {
  const { t } = useTranslation();

  return (
    <div>
      <Button onClick={props.onUndo} disabled={!props.canUndo}>
        {t('Undo')}
      </Button>
      <Button onClick={props.onRedo} disabled={!props.canRedo}>
        {t('Redo')}
      </Button>
    </div>
  );
};
