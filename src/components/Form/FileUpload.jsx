const FileUploadField = ({
  label,
  name,
  register,
  error,
  accept = "image/*,application/pdf",
  multiple = false, 
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        multiple={multiple}
        {...register(name, { required: "This field is required" })}
        type="file"
        accept={accept}
        className={`  block w-full  p-2 border border-primary border-dashed rounded-md focus:outline-none focus:ring ${
          error
            ? "border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:ring-indigo-200"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default FileUploadField;
