import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  position?: number;
}

export const TableFooterItem = (props: Props) => {
  return <td colSpan={props.position}>{props.children}</td>;
};
