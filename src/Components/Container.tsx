import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`w-fit py-[2.4rem] px-[4.8rem] ${className}`}>
      {children}
    </div>
  );
}

export default Container;
