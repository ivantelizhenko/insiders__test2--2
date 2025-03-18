import { ButtonHTMLAttributes } from 'react';

function Button({
  className,
  children,
  ...others
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`not-last:px-[2.4rem] py-[1.2rem] border border-solid border-gray-400 hover:bg-gray-400 hover:text-white cursor-pointer ${className}`}
      {...others}
    >
      {children}
    </button>
  );
}

export default Button;
