"use client";
import React from "react";
import { Modal } from "@/components/modal/modal";
import { Input } from "@/components/input/input";
import { AuthForm, AuthFormField } from "@/models/auth-form";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "@/components/loader/loader";

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
    saveCompletedForm,
    onTyping,
  } = useAuth();

  const disabledSubmit = 
    !!Object.values(form).filter(value => !value).length
    || !nameValid || !emailValid || !passwordValid || !secondPasswordValid;

  const submitForm = async () => {
    saveCompletedForm(form);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, nextInputRef: React.RefObject<HTMLInputElement> | null) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextInputRef && nextInputRef.current) {
        nextInputRef.current.focus();
      }
      if (!nextInputRef) {
        submitForm();
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
          placeholder="Enter your name"
          onKeyDown={(e) => handleKeyDown(e, inputEmailRef)}
          onChange={(e) => handleChange(e, AuthFormField.NAME)}
          value={form.name}
          error={!nameValid}
        />
        <Input
          ref={inputEmailRef}
          placeholder="Enter your email"
          onKeyDown={(e) => handleKeyDown(e, inputPasswordRef)}
          onChange={(e) => handleChange(e, AuthFormField.EMAIL)}
          value={form.email}
          error={!emailValid}
        />
        <Input
          ref={inputPasswordRef}
          placeholder="Password"
          onKeyDown={(e) => handleKeyDown(e, inputSecondPasswordRef)}
          onChange={(e) => handleChange(e, AuthFormField.PASSWORD)}
          value={form.password}
          error={!passwordValid}
        />
        <Input
          ref={inputSecondPasswordRef}
          placeholder="Repeat password"
          onKeyDown={(e) => handleKeyDown(e, null)}
          onChange={(e) => handleChange(e, AuthFormField.SECOND_PASSWORD)}
          value={form.secondPassword}
          error={!secondPasswordValid}
        />

        <div className={styles.authButtons}>
          {submitButtonLoader ? (
            <Loader/>
            ) : (
            <button
              className={styles.authButtonSubmit}
              onClick={submitForm}
              disabled={disabledSubmit}
            >
              Submit
            </button>
          )}
          <span>or</span>
          <button className={styles.authButtonSignin}>Sign In</button>
        </div>
      </div>
    </Modal>
  )
}

export default SignUp;