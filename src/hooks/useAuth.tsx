import React from "react";
import { AuthForm, AuthFormField } from "@/models/auth-form";
import { testDataBase } from "../../db";
import { useRouter } from "next/navigation";

const _submitSignUpForm = (form: AuthForm) => new Promise((res) => {
  setTimeout(() => {
    testDataBase.push({...form, id: testDataBase.length+1})
    res(form);
  }, 3000)
})

const _submitSignInForm = (form: AuthForm) => new Promise((res) => {
  const name = form.name;
  const pass = form.password;
  setTimeout(() => {
    const auth = testDataBase.find(user => user.name === name && user.password === pass);
    res(!!auth);
  }, 3000)
})

export const useAuth = (signin?: boolean) => {
  const router = useRouter();
  const [ nameValid, setNameValid ] = React.useState(true);
  const [ emailValid, setEmailValid ] = React.useState(true);
  const [ passwordValid, setPasswordValid ] = React.useState(true);
  const [ secondPasswordValid, setSecondPasswordValid ] = React.useState(true);
  const [ loading, setLoading ] = React.useState(false);

  const _checkName = (name: string) => {
    const checking = name.split("").length >= 3;
    setNameValid(!!checking);
    return !!checking;
  }

  const _checkEmail = (email?: string) => {
    if (!email) {
      return false;
    }
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
  
  const onFocus = () => {
    if (signin) {
      setNameValid(true);
      setEmailValid(true);
      setPasswordValid(true);
      setSecondPasswordValid(true);
    }
  }

  const signUp = async (form: AuthForm) => {
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
      const data = await _submitSignUpForm({
        name: _name,
        email: _email,
        password: _password,
      })
      console.log('data', data);
      router.replace("/photos/1");
      setLoading(false);      
    } catch {
      console.log("Ain't sign up!");
      setLoading(false); 
    }
  };

  const signIn = async (form: AuthForm) => {
    let _name = form.name;
    let _password = form.password;

    const checkedName = _checkName(_name);
    const checkedPassword = _checkPassword(_password);

    if (!checkedName || !checkedPassword) {
      return;
    }

    try {
      setLoading(true);
      const isAuth = await _submitSignInForm({
        name: _name,
        password: _password,
      })
      if (isAuth) {
        router.replace("/photos/1");
      } else {
        setNameValid(false);
        setPasswordValid(false);
        console.log("Name or password are incorrect!");
      }
      setLoading(false);   
    } catch {
      console.log("Something wrong happened!");
      setLoading(false); 
    }
  }

  return {
    signUp,
    signIn,
    onTyping,
    onFocus,

    nameValid,
    emailValid,
    passwordValid,
    secondPasswordValid,
    submitButtonLoader: loading,
  }
}