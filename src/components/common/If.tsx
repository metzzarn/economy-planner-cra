import { ReactNode } from 'react';

interface Props {
  true: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}
export const If = (props: Props) => {
  const fallback = props.fallback ? props.fallback : '';
  const content = props.true ? props.children : fallback;
  return <span>{content}</span>;
};
