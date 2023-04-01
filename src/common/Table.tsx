import styles from 'common/Table.module.css';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  header?: String[];
}

export const Table = (props: Props) => {
  const header = props.header?.map((title) => <th scope={'col'}>{title}</th>);
  return (
    <table className={styles.table}>
      <thead>{header}</thead>
      <tbody>{props.children}</tbody>
    </table>
  );
};
