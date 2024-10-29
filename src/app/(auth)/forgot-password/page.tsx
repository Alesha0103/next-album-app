"use client";
import React from "react";
import { Modal } from "@/components/modal/modal";

import styles from "../auth.module.scss";
import buttonStyles from "../../../components/auth-buttons/auth-buttons.module.scss";
import { Input } from "@/components/input/input";
import { AuthFormField, AuthFormPlaceholder } from "@/models/auth-form";
import { useAuth } from "@/hooks/useAuth";

const ForgotPassword = () => {
  const [email, setForm] = React.useState<string>("");

  const {
    emailValid,
    forgotPassError,
    submitButtonLoader,
    forgotPassSubmit,
    onTyping,
    onFocus,
  } = useAuth(true);

  const handleSubmit = () => {
    forgotPassSubmit(email);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, inputName: AuthFormField) => {
    setForm(e.target.value);
    onTyping(inputName);
  };

  return (
    <Modal>
      <div className={styles.auth}>
        <h1>Please Enter Your Email</h1>
        <Input
          placeholder={AuthFormPlaceholder.EMAIL}
          onKeyDown={handleKeyDown}
          onChange={(e) => handleChange(e, AuthFormField.EMAIL)}
          value={email}
          error={!emailValid}
          authError={!!forgotPassError}
        />
        <button
          className={buttonStyles.authButtonSubmit}
          // onClick={onSubmitClick}
          disabled={!email}
        >
          Confirm
        </button>
      </div>
    </Modal>
  )
}

export default ForgotPassword;