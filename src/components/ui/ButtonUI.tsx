import React from "react";
import addIcon from "../../assets/icons/add.svg";
import reportIcon from "../../assets/icons/report.svg";
import printIcon from "../../assets/icons/print.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import editIcon from "../../assets/icons/edit.svg";
import cancelIcon from "../../assets/icons/cancel.svg";
import logsIcon from "../../assets/icons/logs.svg";
import submitIcon from "../../assets/icons/submit.svg";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "outline"
  | "success"
  | "link";

type IconVariant =
  | "add"
  | "print"
  | "report"
  | "delete"
  | "edit"
  | "cancel"
  | "logs"
  | "submit";

type SizeVariant = "small" | "medium" | "large";

interface ButtonProps {
  id?: string;
  variant: ButtonVariant;
  onClick?: () => void;
  buttonName?: string;
  breadcrumb?: boolean;
  iconName?: IconVariant;
  disabled?: boolean;
  size: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
}

const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-slate-200 text-black hover:bg-slate-300",
  danger: "bg-rose-600 text-white hover:bg-rose-700",
  warning: "bg-amber-500 text-white hover:bg-amber-600",
  info: "bg-teal-500 text-white hover:bg-teal-600",
  light: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  dark: "border-black bg-black text-white hover:bg-slate-700",
  outline: "border-2 border-black hover:bg-gray-200",
  success: "bg-green-500 text-white hover:bg-green-600",
  link: "bg-transparent text-black-500 hover:text-gray-600 focus:outline-none",
};

const iconVariantClasses: Record<IconVariant, string> = {
  add: addIcon,
  print: printIcon,
  report: reportIcon,
  delete: deleteIcon,
  edit: editIcon,
  cancel: cancelIcon,
  logs: logsIcon,
  submit: submitIcon,
};

const sizeVariantClasses: Record<SizeVariant, string> = {
  small: "text-sm py-1 lg:px-3 h-10",
  medium: "text-[15px] lg:text-base py-2 lg:px-4",
  large: "text-base py-3 lg:px-4",
};

const ButtonUI = ({
  id,
  variant,
  onClick,
  buttonName,
  breadcrumb,
  iconName,
  disabled = false,
  size = "medium",
  type = "button",
}: ButtonProps) => {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${
        breadcrumb
          ? "!text-[0.7rem] !p-0 lg:!text-sm font-medium text-zinc-500 hover:text-zinc-700"
          : ""
      } ${
        sizeVariantClasses[size]
      } rounded-lg font-medium focus:outline-none transition-colors px-2 ${
        buttonVariantClasses[variant]
      } ${
        disabled
          ? "cursor-not-allowed text-white !bg-gray-400 border-gray-400"
          : ""
      }`}
    >
      {iconName ? (
        <div className="flex items-center gap-1 w-7 lg:w-auto justify-center">
          <img
            src={iconVariantClasses[iconName]}
            alt=""
            width={24}
            height={24}
          />
          <span className="hidden lg:block">{buttonName}</span>
        </div>
      ) : (
        buttonName
      )}
    </button>
  );
};

export default ButtonUI;
