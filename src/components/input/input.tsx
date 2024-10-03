import classNames from "classnames";
import React from "react";

import styles from "./input.module.scss";
import { IconTooltip } from "../icon-tooltip/icon-tooltip";
import { AuthFormPlaceholder } from "@/models/auth-form";

interface InputProps {
  placeholder: AuthFormPlaceholder;
  value?: string;
  error?: boolean;
  authError?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  placeholder, onKeyDown, onChange, onFocus, value, error, authError
}, ref) => {

  const createTooltipContent = (placeholder: AuthFormPlaceholder): string => {
    switch(placeholder) {
      case AuthFormPlaceholder.NAME:
        return "The name must consist of at least 3 symbols";
      case AuthFormPlaceholder.EMAIL:
        return "Valid email required";
      case AuthFormPlaceholder.PASSWORD:
        return "The password must contain at least 8 symbols, 1 UPPER CASE letter, 4 numbers";
      case AuthFormPlaceholder.SECOND_PASSWORD:
        return "The field must be equal the password field";
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
      {!authError && error && <IconTooltip content={createTooltipContent(placeholder)} error={error}/>}
    </div>
  )
})
