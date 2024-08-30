import React from "react";
import { AuthForm, AuthFormField } from "@/models/auth-form";
import { testDataBase } from "../../db";
import { useRouter } from "next/navigation";

const _submitForm = (form: AuthForm) => new Promise((res, rej) => {
  setTimeout(() => {
    testDataBase.push({...form, id: testDataBase.length+1})
    res(form);
  }, 3000)
})

export const useAuth = () => {
  const router = useRouter();
  const [ nameValid, setNameValid ] = React.useState(true);
  const [ emailValid, setEmailValid ] = React.useState(true);
  const [ passwordValid, setPasswordValid ] = React.useState(true);
  const [ secondPasswordValid, setSecondPasswordValid ] = React.useState(true);

  const [loading, setLoading] = React.useState(false);

  const _checkName = (name: string) => {
    const checking = name.split("").length >= 3;
    setNameValid(!!checking);
    return !!checking;
  }

  const _checkEmail = (email: string) => {
    const checking = email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    setEmailValid(!!checking);
    return !!checking;
  }

  const _checkPassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasDigit = (password.match(/\d/g) || []).length >= 4;
    const hasMinimumLength = password.length >= 8;

    setPasswordValid(hasUpperCase && hasDigit && hasMinimumLength)

    return (
      hasUpperCase && hasDigit && hasMinimumLength
    );
  }

  const _checkSecondPassword = (
    password: string,
    secondPassword?: string
  ) => {
    setSecondPasswordValid(password === secondPassword);

    return (
      password === secondPassword
    );
  }

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

  const submitForm = async (form: AuthForm) => {
    let _name = form.name;
    let _email = form.email;
    let _password = form.password;
    let _secondPassword = form.secondPassword;

    const checkedName = _checkName(_name);
    const checkedEmail = _checkEmail(_email);
    const checkedPassword = _checkPassword(_password);
    const checkedSecondPassword = _checkSecondPassword(_password, _secondPassword);

    if (!checkedName || !checkedEmail || !checkedPassword || !checkedSecondPassword) {
      return;
    }

    try {
      setLoading(true);
      const data = await _submitForm({
        name: _name,
        email: _email,
        password: _password,
      })
      console.log('data', data);
      router.replace("/photos/1");
      setLoading(false);      
    } catch {
      console.log("Ain't sign up!")
    }
  };

  return {
    submitForm,
    onTyping,

    nameValid,
    emailValid,
    passwordValid,
    secondPasswordValid,
    submitButtonLoader: loading,
  }
}