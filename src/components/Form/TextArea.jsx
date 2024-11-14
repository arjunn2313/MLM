const TextareaField = ({ label, name, register }) => {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <textarea
        {...register(name)}
        rows="4"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
      />
      {/* {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>} */}
    </div>
  );
};

export default TextareaField;
