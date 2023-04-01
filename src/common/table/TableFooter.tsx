import styles from 'common/table/TableFooter.module.css';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const TableFooter = (props: Props) => {
  return <tr className={styles.footer}>{props.children}</tr>;
};
