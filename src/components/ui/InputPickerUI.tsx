import React, { useState } from "react";

interface InputPickerProps {
  id: string;
  type: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  required: boolean;
}

const InputPickerUI = ({
  id,
  type,
  label,
  disabled = false,
  error,
  required = true,
}: InputPickerProps) => {
  const [listener, setListener] = useState(false);
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
        {type === "time" ? (
          <div>
            <div className="relative">
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
              <input
                type={type}
                id={id}
                className={`${disabled ? "bg-gray-200" : ""} ${
                  listener && "!outline-black"
                } ${
                  error && "!outline-red-500 bg-red-50"
                } pr-10 border-0 outline-gray-300 outline outline-2 outline-offset-0 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-black text-gray-900 text-base rounded-lg block w-full
                [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:opacity-0`}
                min="00:00"
                max="23:00"
                onChange={() => {
                  setListener(true);
                }}
                disabled={disabled}
              />
            </div>

            {error && (
              <span className="mt-3 text-sm text-red-600">{error}</span>
            )}
          </div>
        ) : (
          <div>
            <div className="relative">
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
              <input
                id={id}
                type="date"
                disabled={disabled}
                onChange={() => {
                  setListener(true);
                }}
                className={`${disabled ? "bg-gray-200 text-gray-900" : ""} ${
                  listener && "!outline-black"
                } ${
                  error && "!outline-red-500 bg-red-50"
                } pr-5 border-0 outline-gray-300 outline outline-2 outline-offset-0 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-black text-gray-900 text-base rounded-lg block w-full 
                [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:opacity-0 `}
              />
            </div>

            {error && (
              <span className="mt-3 text-sm text-red-600">{error}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputPickerUI;
