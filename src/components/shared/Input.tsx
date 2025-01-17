import React from "react";
import eyeIcon from "../../assets/icons/eye-open.svg";

type PrependIconVariant = "currency" | "search" | "mobileNumber";

type AppendIconVariant = "password";

interface InputProps {
  id?: string;
  type: string;
  placeholder?: string;
  label?: string;
  prepend?: PrependIconVariant;
  append?: AppendIconVariant;
  disabled?: boolean;
  error?: string;
  required?: boolean;
  name?: string;
  defaultValue?: string | number;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  defaultChecked?: boolean;
}

const prependIconVariantClasses: Record<PrependIconVariant, JSX.Element> = {
  currency: <span className="text-gray-500">PHP</span>,
  search: (
    <svg
      className="w-4 h-4 text-gray-500"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
      />
    </svg>
  ),
  mobileNumber: <span className="text-gray-500">+63</span>,
};

const appendIconVariantClasses: Record<AppendIconVariant, string> = {
  password: eyeIcon,
};

const Input = ({
  id,
  type,
  placeholder,
  label,
  prepend,
  append,
  disabled = false,
  error,
  required = true,
  name,
  onChange,
  min,
  defaultValue,
  value,
  defaultChecked,
}: InputProps) => {
  const inputProps = value !== undefined ? { value } : { defaultValue };

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className={`block mb-2 text-base font-medium text-gray-900 ${
            error ? "!text-red-600" : ""
          }`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {prepend && (
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pr-2.5 pointer-events-none">
            {prependIconVariantClasses[prepend]}
          </div>
        )}

        {/* if type is date */}
        {type === "date" && (
          <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
        )}

        {/* if type is time */}
        {type === "time" && (
          <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        )}

        <input
          defaultChecked={defaultChecked}
          min={min}
          onChange={onChange}
          name={name}
          type={type}
          id={id}
          disabled={disabled}
          className={`${disabled ? "bg-gray-200" : ""} ${
            error ? "!border-red-500 bg-red-50" : ""
          } h-[50px] border-1 border-gray focus:border-black focus:ring-black text-gray-900 text-base rounded-lg block w-full [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:opacity-0 ${
            prepend ? "ps-12" : ""
          } p-2.5`}
          placeholder={placeholder}
          required={required}
          {...inputProps}
        />
        {append && (
          <div className="absolute inset-y-0 end-0 flex items-center ps-2.5 pr-3.5 cursor-pointer">
            <img src={appendIconVariantClasses[append]} alt="" />
          </div>
        )}
      </div>
      
      {error && <span className="mt-3 text-sm text-red-600">{error}</span>}
    </div>
  );
};

export default Input;
