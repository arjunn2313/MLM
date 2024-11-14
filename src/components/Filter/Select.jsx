const FilterSelect = ({ type, options, selectedValue, onChange }) => {
  return (
    <select
      className="border p-1 rounded-md focus:ring-0 outline-none"
      value={selectedValue}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {type}  {option}
        </option>
      ))}
    </select>
  );
};

export default FilterSelect;
