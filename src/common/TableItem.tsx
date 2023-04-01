import styles from 'common/TableItem.module.css';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export const TableItem = (props: Props) => {
  return <th className={styles.item}>{props.children}</th>;
};
