const RadioField = ({ label, name, register, options }) => {
    return (
      <div className="flex items-center  gap-16">
        <label className="block text-sm font-medium">{label}</label>
        <div className="mt-1 flex gap-5">
          {options.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                {...register(name)}
                type="radio"
                value={option.value}
                id={option.value}
                className={`h-4 w-4 focus:ring-indigo-500 ${option.color}`}  
              />
              <label
                htmlFor={option.value}
                className={`ml-2 text-sm ${option.textColor}`}  
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default RadioField;
  
