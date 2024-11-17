import React from "react";

const SelectGroup = ({
  label,
  name,
  options = [],
  placeholder = "",
  register,
  error,
  selectName,
  inputName,
  watch,
  setValue,
}) => {
  const selectValue = watch(selectName);
  const inputValue = watch(inputName);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div
        className={`flex items-center border mt-1 rounded-md overflow-hidden  `}
      >
        <select
          {...register(selectName, { required: "Relation is required" })}
          className="h-full bg-gray-100 px-4 py-2 focus:outline-none border-none"
          value={selectValue || options[0]}
          onChange={(e) => setValue(selectName, e.target.value)}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input
          {...register(inputName, { required: "Parent name is required" })}
          type="text"
          className="flex-1 px-4 py-2 border-none focus:outline-none"
          placeholder={placeholder}
          value={inputValue || ""}
          onChange={(e) => setValue(inputName, e.target.value)}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default SelectGroup;
