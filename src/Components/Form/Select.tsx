interface SelectProps {
  options: string[];
}

function Select({ options, ...other }: SelectProps) {
  return (
    <select
      className="w-full border border-solid border-gray-400 focus:border-black"
      {...other}
    >
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
