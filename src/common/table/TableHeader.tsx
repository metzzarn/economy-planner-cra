import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const TableHeader = (props: Props) => {
  return <th scope={'col'}>{props.children}</th>;
};
