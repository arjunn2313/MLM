function RadioGroup({ label, name, options, selectedValue, onChange }) {
  return (
    <div className="flex mt-6 gap-[20%]">
      <p className="font-medium">{label}</p>
      <div className="flex gap-5">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-2">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={onChange}
              className={`cursor-pointer w-4 h-4  `}
            />
            <span className={`${option.color} font-medium`}>
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default RadioGroup;
