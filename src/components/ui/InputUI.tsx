import React from "react";
import eyeIcon from "../../assets/icons/eye-open.svg";

type PrependIconVariant = "currency" | "search" | "mobileNumber";

type AppendIconVariant = "password";

interface InputProps {
  id: string;
  type: string;
  placeholder: string;
  label?: string;
  prepend?: PrependIconVariant;
  append?: AppendIconVariant;
  disabled?: boolean;
  error?: string;
  required: boolean;
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

const InputUI = ({
  id,
  type,
  placeholder,
  label,
  prepend,
  append,
  disabled = false,
  error,
  required = true,
}: InputProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={`block mb-2 text-base font-medium text-gray-900 ${
          error && "!text-red-600"
        }`}
      >
        {label}
      </label>
      <div className="relative">
        {prepend && (
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pr-2.5 pointer-events-none">
            {prependIconVariantClasses[prepend]}
          </div>
        )}
        <input
          type={type}
          id={id}
          disabled={disabled}
          className={`${disabled ? "bg-gray-200" : ""} ${
            error && "!outline-red-500 bg-red-50"
          } border-0 outline-black placeholder-shown:outline-gray-300 outline outline-2 outline-offset-0 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-black text-gray-900 text-base rounded-lg block w-full ${
            prepend && "ps-12"
          } p-2.5`}
          placeholder={placeholder}
          required={required}
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

export default InputUI;
