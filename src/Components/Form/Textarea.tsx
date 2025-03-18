function Textarea({ ...other }) {
  return (
    <textarea
      className="border border-solid border-gray-400 focus:border-black"
      {...other}
    />
  );
}

export default Textarea;
