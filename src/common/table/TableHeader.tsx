import React, { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
  width?: string;
  onClick?: () => any;
}

export const TableHeader = ({ children, width, onClick, ...props }: Props) => {
  return (
    <th
      scope={'col'}
      style={{ width: width }}
      onClick={() => onClick && onClick()}
      {...props}
    >
      {children}
    </th>
  );
};
