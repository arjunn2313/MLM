const JoindedBox = ({
  label,
  name,
  placeholder,
  type = "text",
  register,
  options = [],
  error,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="mt-1 flex">
      {/* Input Box */}
      <input
        type={type}
        placeholder={placeholder}
        className="w-[95%] p-2 border border-r-0   focus:ring-blue-500 focus:border-blue-500"
        {...register(`${name}.period`)}
      />

      {/* Select Box */}
      <select
        className="w-1/3 p-2 border   border-l-0     "
        {...register(`${name}.unit`)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

export default JoindedBox;
