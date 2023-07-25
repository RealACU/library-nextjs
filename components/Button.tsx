"use client";

import DynamicIcon from "./homePage/DynamicIcon";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  iconName?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  iconName,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full
        ${outline ? "bg-white" : "bg-primary-color"}
        ${outline ? "border-black" : "border-primary-color"}
        ${outline ? "text-black" : "text-white"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "py-1" : "py-3"}
        ${small ? "font-light" : "font-semibold"}
        ${small ? "border-[1px]" : "border-2"}
      `}
    >
      {iconName && (
        <DynamicIcon
          iconName={iconName}
          size={24}
          className="absolute left-4 top-3"
        />
      )}
      {label}
    </button>
  );
};

export default Button;
