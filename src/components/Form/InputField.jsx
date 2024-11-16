const InputField = ({
  label,
  name,
  placeholder,
  type = "text",
  register,
  options = [],
  error,
  isError,
  isLoading,
  disabled = false,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    {type === "select" ? (
      <select className="mt-1 block w-full p-2 border rounded-md" {...register}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : (
      <input
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        className="mt-1 block w-full p-2 border rounded-md"
        {...register}
      />
    )}
    {isLoading && (
      <span className="text-gray-500 text-sm mt-1">
        Checking for sponsor details...
      </span>
    )}
    
    {!isLoading && error && (
      <span className="text-red-500 text-sm mt-1">{error.message}</span>
    )}
    {!isLoading && isError && !error && (
      <span className="text-red-500 text-sm mt-1">
        {isError?.response?.data?.error}
      </span>
    )}
  </div>
);

export default InputField;
