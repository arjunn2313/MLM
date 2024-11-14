const CheckboxField = ({ label, name, register, error }) => (
    <div className="flex items-center mt-1">
      <input
        type="checkbox"
        id={name}
        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
        {...register(name)}
      />
      <label htmlFor={name} className="ml-2 text-sm text-gray-700">
        {label}
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
  
  export default CheckboxField;
  