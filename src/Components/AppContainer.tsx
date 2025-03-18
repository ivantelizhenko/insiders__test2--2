import { ContainerProps } from '../types/types';

function AppContainer({ children, className }: ContainerProps) {
  return (
    <div
      className={`flex justify-center items-center h-full bg-green-200  ${className}`}
    >
      {children}
    </div>
  );
}

export default AppContainer;
