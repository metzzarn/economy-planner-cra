import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  width?: string;
}

export const TableHeader = (props: Props) => {
  return (
    <th scope={'col'} style={{ width: props.width }}>
      {props.children}
    </th>
  );
};
