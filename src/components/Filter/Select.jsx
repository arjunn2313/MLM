const FilterSelect = ({ type, options, selectedValue, onChange }) => {
  return (
    <div className="border p-1 rounded-md focus:ring-0 outline-none px-2  ">
      <label> {type && `${type} : `} </label>
      <select value={selectedValue} onChange={(e) => onChange(e.target.value)} className="outline-none">
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSelect;
