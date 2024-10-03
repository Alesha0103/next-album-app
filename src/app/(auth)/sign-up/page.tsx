"use client";
import React from "react";
import { Modal } from "@/components/modal/modal";
import { Input } from "@/components/input/input";
import { AuthButtonType, AuthForm, AuthFormField, AuthFormPlaceholder } from "@/models/auth-form";
import { useAuth } from "@/hooks/useAuth";
import { AuthButtons } from "@/components/auth-buttons/auth-buttons";

import styles from "../auth.module.scss";

const SignUp = () => {
  const [form, setForm] = React.useState<AuthForm>({
    [AuthFormField.NAME]: "",
    [AuthFormField.EMAIL]: "",
    [AuthFormField.PASSWORD]: "",
    [AuthFormField.SECOND_PASSWORD]: ""
  });

  const inputNameRef = React.useRef<HTMLInputElement>(null);
  const inputEmailRef = React.useRef<HTMLInputElement>(null);
  const inputPasswordRef = React.useRef<HTMLInputElement>(null);
  const inputSecondPasswordRef = React.useRef<HTMLInputElement>(null);

  const {
    nameValid,
    emailValid,
    passwordValid,
    secondPasswordValid,
    submitButtonLoader,
    signUpError,
    signUp,
    onTyping,
  } = useAuth();

  const disabledSubmit = 
    !!Object.values(form).filter(value => !value).length
    || !nameValid || !emailValid || !passwordValid || !secondPasswordValid || submitButtonLoader;

  const handleSubmit = () => {
    signUp(form);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, nextInputRef: React.RefObject<HTMLInputElement> | null) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextInputRef && nextInputRef.current) {
        nextInputRef.current.focus();
      }
      if (!nextInputRef && !disabledSubmit) {
        handleSubmit();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, inputName: AuthFormField) => {
    setForm(prevValues => ({
      ...prevValues,
      [inputName]: e.target.value
    }));
    onTyping(inputName);
  };

  return (
    <Modal>
      <div className={styles.auth}>
        <h1>Please Sign Up</h1>
        <Input
          ref={inputNameRef}
          placeholder={AuthFormPlaceholder.NAME}
          onKeyDown={(e) => handleKeyDown(e, inputEmailRef)}
          onChange={(e) => handleChange(e, AuthFormField.NAME)}
          value={form.name}
          error={!nameValid}
          authError={!!signUpError}
        />
        <Input
          ref={inputEmailRef}
          placeholder={AuthFormPlaceholder.EMAIL}
          onKeyDown={(e) => handleKeyDown(e, inputPasswordRef)}
          onChange={(e) => handleChange(e, AuthFormField.EMAIL)}
          value={form.email}
          error={!emailValid}
          authError={!!signUpError}
        />
        <Input
          ref={inputPasswordRef}
          placeholder={AuthFormPlaceholder.PASSWORD}
          onKeyDown={(e) => handleKeyDown(e, inputSecondPasswordRef)}
          onChange={(e) => handleChange(e, AuthFormField.PASSWORD)}
          value={form.password}
          error={!passwordValid}
        />
        <Input
          ref={inputSecondPasswordRef}
          placeholder={AuthFormPlaceholder.SECOND_PASSWORD}
          onKeyDown={(e) => handleKeyDown(e, null)}
          onChange={(e) => handleChange(e, AuthFormField.SECOND_PASSWORD)}
          value={form.secondPassword}
          error={!secondPasswordValid}
        />
        {
          <div className={styles.accountError}>
            {signUpError && (
              <div className={styles.error}>
                {signUpError}
              </div>
            )}
          </div>
        }
        <AuthButtons
          disabled={disabledSubmit}
          loader={submitButtonLoader}
          onSubmitClick={handleSubmit}
          type={AuthButtonType.SIGN_UP}
        />
      </div>
    </Modal>
  )
}

export default SignUp;