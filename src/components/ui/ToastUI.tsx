import React from "react";

type ToastVariant = "success" | "error" | "warning" | "info";

interface ToastProps {
  variant: ToastVariant;
  message: string;
}

const toastVariant: Record<ToastVariant, JSX.Element> = {
  success: (
    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 rounded-lg">
      <svg
        className="w-7 h-7"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
      </svg>
      <span className="sr-only">Check icon</span>
    </div>
  ),
  error: (
    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-rose-500 rounded-lg">
      <svg
        className="w-7 h-7"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
      </svg>
      <span className="sr-only">Error icon</span>
    </div>
  ),
  warning: (
    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-amber-500 rounded-lg">
      <svg
        className="w-7 h-7"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
      </svg>
      <span className="sr-only">Check icon</span>
    </div>
  ),
  info: (
    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-sky-500 rounded-lg">
      <svg
        className="w-7 h-7"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Check icon</span>
    </div>
  ),
};

const ToastUI = ({ variant, message }: ToastProps) => {
  return (
    <div
      id="toast-success"
      className={`fixed flex items-center z-50 w-full max-w-72 p-4 space-x-2 text-black  rounded-lg shadow top-20 right-5 ${
        variant === "success"
          ? "bg-green-200"
          : variant === "error"
          ? "bg-rose-200"
          : variant === "warning"
          ? "bg-yellow-200"
          : "bg-blue-200"
      }`}
      role="alert"
    >
      {toastVariant[variant]}
      <div className="ms-3 text-sm font-normal">{message}</div>
    </div>
  );
};

export default ToastUI;
