import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'outline' | 'success' | 'link';

interface ButtonProps {
  variant: ButtonVariant;
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-gray-500 text-white hover:bg-gray-600',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
  info: 'bg-teal-500 text-white hover:bg-teal-600',
  light: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  dark: 'bg-black text-white hover:bg-slate-700',
  outline: 'border-2 border-black hover:bg-gray-200',
  success: 'bg-green-500 text-white hover:bg-green-600',
  link: 'bg-transparent text-black-500 hover:text-gray-600 focus:outline-none'
};

const Button = ({ variant, onClick, children, type = 'button' }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-2 px-4 rounded-lg focus:outline-none transition-colors ${buttonVariantClasses[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
