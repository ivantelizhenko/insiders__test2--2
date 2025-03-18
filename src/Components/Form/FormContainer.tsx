import { ContainerProps } from '../../types/types';

function FormContainer({ children, className }: ContainerProps) {
  return (
    <div
      className={`w-fit py-[2.4rem] px-[4.8rem]  bg-blue-200 flex flex-col gap-[1.2rem] items-center justify-center translate-y-[-8rem] ${className}`}
    >
      {children}
    </div>
  );
}

export default FormContainer;
