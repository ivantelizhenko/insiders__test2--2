function Input({ ...others }) {
  return (
    <input
      {...others}
      className="w-full border border-solid border-gray-400 focus:border-black "
    />
  );
}

export default Input;
