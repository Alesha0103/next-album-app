import React from "react";
import { AuthForm, AuthFormField } from "@/models/auth-form";
import { testDataBase } from "../../db";

export const useAuth = () => {
  const [ name, setName ] = React.useState("");
  const [ email, setEmail ] = React.useState("");
  const [ password, setPassword ] = React.useState("");
  const [ secondPassword, setSecondPassword ] = React.useState("");

  const [ nameValid, setNameValid ] = React.useState(true);
  const [ emailValid, setEmailValid ] = React.useState(true);
  const [ passwordValid, setPasswordValid ] = React.useState(true);
  const [ secondPasswordValid, setSecondPasswordValid ] = React.useState(true);

  const [loading, setLoading] = React.useState(false);

  const checkName = React.useCallback(() => {
    if (name.split("").length > 3) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  }, [name]);

  const checkEmail = React.useCallback(() => {
    const checking = email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (!!checking) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  }, [email]);

  const checkPassword = React.useCallback(() => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasDigit = (password.match(/\d/g) || []).length >= 4;
    const hasMinimumLength = password.length >= 8;
    setPasswordValid(hasUpperCase && hasDigit && hasMinimumLength);
  }, [password]);

  const checkSecondPassword = React.useCallback(() => {
    if (!!password && !!secondPassword) {
      setSecondPasswordValid(password === secondPassword);
    }
  }, [secondPassword]);

  const saveCompletedForm = React.useCallback((form: AuthForm) => {
    setName(form.name);
    setEmail(form.email);
    setPassword(form.password);
    setSecondPassword(form.secondPassword || "");
  }, []);

  const onTyping = React.useCallback((type: AuthFormField) => {
    switch (type) {
      case AuthFormField.NAME:
        setNameValid(true);
        break;
      case AuthFormField.EMAIL:
        setEmailValid(true);
        break;
      case AuthFormField.PASSWORD:
        setPasswordValid(true);
        break;
      case AuthFormField.SECOND_PASSWORD:
        setSecondPasswordValid(true);
        break;
      default:
        break;
    }
  }, []);

  const submitForm = React.useCallback(() => {}, [])

  React.useEffect(() => {
    if (name && email && password && secondPassword) {
      checkName();
      checkEmail();
      checkPassword();
      checkSecondPassword();
    }
  }, [ name, email, password, secondPassword ]);

  return {
    saveCompletedForm,
    onTyping,

    nameValid,
    emailValid,
    passwordValid,
    secondPasswordValid,
    submitButtonLoader: loading,
  }
}