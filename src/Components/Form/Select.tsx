interface SelectProps {
  options: string[];
}

function Select({ options }: SelectProps) {
  return (
    <select className="w-full border border-solid border-gray-400 focus:border-black">
      {options.map(option => (
        <option>{option}</option>
      ))}
    </select>
  );
}

export default Select;
