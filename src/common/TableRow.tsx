import styles from 'common/TableRow.module.css';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const TableRow = (props: Props) => {
  return <tr className={styles.row}>{props.children}</tr>;
};
