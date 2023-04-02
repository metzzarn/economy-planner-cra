import styles from 'common/table/TableRow.module.css';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const TableRow = (props: Props) => {
  return (
    <tbody>
      <tr className={styles.row}>{props.children}</tr>
    </tbody>
  );
};
