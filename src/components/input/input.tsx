import classNames from "classnames";
import React from "react";

import styles from "./input.module.scss";
import { IconTooltip } from "../icon-tooltip/icon-tooltip";
import { AuthFormPlaceholder } from "@/models/auth-form";

interface InputProps {
  placeholder: AuthFormPlaceholder;
  value?: string;
  error?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  placeholder, onKeyDown, onChange, onFocus, value, error
}, ref) => {

  const createTooltipContent = (placeholder: AuthFormPlaceholder): string => {
    switch(placeholder) {
      case AuthFormPlaceholder.NAME:
        return "Name should has at least 3 symbols";
      case AuthFormPlaceholder.EMAIL:
        return "Valid email required";
      case AuthFormPlaceholder.PASSWORD:
        return "Password should contain at least 8 symbols, 1 UPPER CASE letter, 4 numbers";
      case AuthFormPlaceholder.SECOND_PASSWORD:
        return "The field should be equal the password field";
      default: 
        return "";
    }
  }

  return (
    <div className={styles.input}>
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onChange={onChange}
        value={value}
        className={classNames({ [styles.error]: error })}
        onFocus={onFocus}
      />
      {error && <IconTooltip content={createTooltipContent(placeholder)} error={error}/>}
    </div>
  )
})
