import React, { useState } from "react";
import PropTypes from "prop-types";
import "react-phone-number-input/style.css";
import Input from "react-phone-number-input";

export const PhoneNumber = ({
  defaultCountry = "IN",
  placeholder = "Enter phone number",
  value: initialValue,
  onChange,
  error,
  disabled,
  label,
  isLoading,
  isError,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <Input
        defaultCountry={defaultCountry}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`mt-1   block w-full p-2 border rounded-md ${
          error || isError ? "border-red-500" : "border-gray-300"
        } focus:outline-none  focus:ring-0 focus:ring-indigo-500`}
        disabled={disabled || isLoading}
      />

      {isLoading && (
        <span className="text-gray-500 text-sm mt-1">
          Checking phone number...
        </span>
      )}

      {!isLoading && error && (
        <span className="text-red-500 text-sm mt-1">{error.message}</span>
      )}

      {!isLoading && isError && !error && (
        <span className="text-red-500 text-sm mt-1">
          Phone number already exists or is invalid.
        </span>
      )}
    </div>
  );
};

PhoneNumber.propTypes = {
  defaultCountry: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.object, // Error object from react-hook-form
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  isLoading: PropTypes.bool, // Loading state from query
  isError: PropTypes.bool, // Error state from query
};
