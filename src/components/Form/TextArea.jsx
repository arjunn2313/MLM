export const TextAreaField = ({ label, name, placeholder, register, error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      placeholder={placeholder}
      className="mt-1 block w-full p-2 h-20 border rounded-md"
      {...register(name, { required: "This field is required" })}
    />
    {error && <span className="text-red-500 text-sm mt-1">{error.message}</span>}
  </div>
);
