"use client";
import React from "react";
import { Modal } from "@/components/modal/modal";
import { Input } from "@/components/input/input";
import { AuthButtonType, AuthForm, AuthFormField, AuthFormPlaceholder } from "@/models/auth-form";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "@/components/loader/loader";

import styles from "../auth.module.scss";
import classNames from "classnames";
import { LoaderScale } from "@/models/loader-scale";
import { AuthButtons } from "@/components/auth-buttons/auth-buttons";

const SignIn = () => {
  const [form, setForm] = React.useState<AuthForm>({
    [AuthFormField.NAME]: "",
    [AuthFormField.PASSWORD]: "",
  });

  const inputNameRef = React.useRef<HTMLInputElement>(null);
  const inputPasswordRef = React.useRef<HTMLInputElement>(null);

  const {
    nameValid,
    passwordValid,
    submitButtonLoader,
    signIn,
    onTyping,
    onFocus,
  } = useAuth(true);

  const disabledSubmit = 
    !!Object.values(form).filter(value => !value).length
    || !nameValid || !passwordValid || submitButtonLoader;

  const handleSubmit = () => {
    signIn(form);
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
        <h1>Please Sign In</h1>
        <Input
          ref={inputNameRef}
          placeholder={AuthFormPlaceholder.NAME}
          onKeyDown={(e) => handleKeyDown(e, inputPasswordRef)}
          onChange={(e) => handleChange(e, AuthFormField.NAME)}
          onFocus={onFocus}
          value={form.name}
          error={!nameValid}
          
        />
        <Input
          ref={inputPasswordRef}
          placeholder={AuthFormPlaceholder.PASSWORD}
          onKeyDown={(e) => handleKeyDown(e, null)}
          onChange={(e) => handleChange(e, AuthFormField.PASSWORD)}
          onFocus={onFocus}
          value={form.password}
          error={!passwordValid}
        />
        {/* <div>Acount is not found</div> */}
        <AuthButtons
          disabled={disabledSubmit}
          loader={submitButtonLoader}
          onSubmitClick={handleSubmit}
          type={AuthButtonType.SIGN_IN}
        />
      </div>
    </Modal>
  )
}

export default SignIn;