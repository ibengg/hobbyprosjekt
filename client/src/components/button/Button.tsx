import React from "react";
import "./Button.css";

export interface ButtonProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  className?: string;
  label?: string;
}

export const Button = ({
  children,
  onClick,
  onKeyDown,
  variant = "primary",
  size = "medium",
  disabled = false,
  className = "",
  label = "button",
}: ButtonProps) => {
  return (
    <button
      tabIndex={0}
      className={`basic-button basic-button--${variant} basic-button--${size} ${className}`.trim()}
      onClick={onClick}
      onKeyDown={onKeyDown}
      disabled={disabled}
      type="button"
      aria-label={label}
    >
      {children}
    </button>
  );
};

export default Button;
