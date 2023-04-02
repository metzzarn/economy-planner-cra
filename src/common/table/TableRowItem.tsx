import styles from 'common/table/TableRowItem.module.css';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export const TableRowItem = (props: Props) => {
  return <th className={styles.item}>{props.children}</th>;
};
