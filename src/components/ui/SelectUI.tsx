import React from "react";
import Select, { StylesConfig } from "react-select";

interface SelectProps {
  label?: string;
}

const SelectUI = ({ label }: SelectProps) => {
  const options = [
    {
      value: "XYZ Company",
      label: (
        <p className="flex flex-col">
          <span className="font-bold">XYZ Company</span>
          <span>Services</span>
        </p>
      ),
    },
    {
      value: "ABC Company",
      label: (
        <p className="flex flex-col">
          <span className="font-bold">ABC Company</span>
          <span>Services</span>
        </p>
      ),
    },
    {
      value: "JKL Company",
      label: (
        <p className="flex flex-col">
          <span className="font-bold">JKL Company</span>
          <span>Services</span>
        </p>
      ),
    },
    {
      value: "Option 3",
      label: (
        <button className="flex items-center text-blue-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1c64f2"
          >
            <path d="M450-450H220v-60h230v-230h60v230h230v60H510v230h-60v-230Z" />
          </svg>
          Add a new supplier
        </button>
      ),
    },
  ];

  const style: StylesConfig = {
    control: (base: any, state: any) => ({
      ...base,
      outline: "none",
      padding: "0.25rem",
      borderWidth: "2px",
      borderRadius: "0.5rem",
      border: state.isFocused || state.hasValue ? "2px solid #000000" : "2px solid #D1D5DB",
      boxShadow: "none",
      "&:hover": state.isFocused ? "2px solid #000000" : "2px solid #D1D5DB",
    }),

    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected ? "#e5e7eb" : state.isFocused ? "#f3f3f3" : "white",
      color: state.isSelected ? "#111827" : "#000000",
    }),
  };

  return (
    <div>
      <label
        htmlFor="options"
        className="block mb-2 text-base font-medium text-gray-900"
      >
        {label}
      </label>
      <Select
        className="basic-single [&.[type='text']]:bg-blue-300"
        classNamePrefix="select"
        name="Select"
        isClearable
        options={options}
        styles={style}
      />
    </div>
  );
};

export default SelectUI;
