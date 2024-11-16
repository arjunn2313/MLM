import React from "react";

export default function SelectGroup({
  label,
  placeholder,
  value = {}, // default empty object
  onChange,
  error,
  options,
}) {
  const [selectValue, setSelectValue] = React.useState(value.relation || options[0]);
  const [inputValue, setInputValue] = React.useState(value.name || "");

  const handleSelectChange = (e) => {
    const newRelation = e.target.value;
    setSelectValue(newRelation);
    onChange({ relation: newRelation, name: inputValue });
  };

  const handleInputChange = (e) => {
    const newName = e.target.value;
    setInputValue(newName);
    onChange({ relation: selectValue, name: newName });
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center border mt-1 rounded-md overflow-hidden">
        <select
          className="h-full bg-gray-100 px-4 py-2 focus:outline-none border-none"
          value={selectValue}
          onChange={handleSelectChange}
        >
          {options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="flex-1 px-4 py-2 border-none focus:outline-none"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
