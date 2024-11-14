// const FileUploadField = ({ label, name, register, accept = "image/*,application/pdf" }) => {
//     return (
//       <div>
//         <label className="block text-sm font-medium">{label}</label>
//         <input
//           {...register(name)}
//           type="file"
//           accept={accept}
//           className="mt-1 block w-full px-3 py-2 border border-dashed border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
//         />
//       </div>
//     );
//   };
  
//   export default FileUploadField;
  
const FileUploadField = ({ label, name, register, error, accept = "image/*,application/pdf" }) => {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        {...register(name, { required: "This field is required" })}  // Apply validation directly here
        type="file"
        accept={accept}
        className={`mt-1 block w-full px-3 py-2 border border-dashed rounded-md focus:outline-none focus:ring ${
          error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default FileUploadField;
