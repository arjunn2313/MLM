const InputField = ({
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
    {type === "select" ? (
      <select className="mt-1 block w-full p-2 border" {...register}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1 block w-full p-2 border"
        {...register}
      />
    )}
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

export default InputField;
