import classNames from "classnames";
import React from "react";

import styles from "./input.module.scss";

interface InputProps {
  placeholder: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  placeholder, onKeyDown, onChange, value, error
}, ref) => {
  return (
    <>
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onChange={onChange}
        value={value}
        className={classNames({ [styles.error]: error })}
      />
    </>
  )
})
