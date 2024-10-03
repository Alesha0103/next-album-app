import React from "react";
import { AuthForm, AuthFormField } from "@/models/auth-form";
import { testDataBase } from "../../db";
import { useRouter } from "next/navigation";

enum ErrorName {
  NAME = "name",
  EMAIL = "email",
  NAME_EMAIL = "name_email",
  PASSWORD = "password",
}

const _submitSignUpForm = (form: AuthForm) => new Promise((res,rej) => {
  const name = form.name;
  const email = form.email;
  const userExist = !!testDataBase.find(user => user.name === name);
  const emailExist = !!testDataBase.find(user => user.email === email);

  if (userExist && email) {
    rej({
      name: ErrorName.NAME_EMAIL,
      message: "This user already exists",
    });
  }

  if (userExist) {
    rej({
      name: ErrorName.NAME,
      message: "User with this name already exists. Try another name",
    });
  }

  if (emailExist) {
    rej({
      name: ErrorName.EMAIL,
      message: "User with this emeil already exists",
    });
  }

  setTimeout(() => {
    testDataBase.push({...form, id: testDataBase.length+1})
    res(form);
  }, 3000)
})

const _submitSignInForm = (form: AuthForm) => new Promise((res, rej) => {
  const name = form.name;
  const password = form.password;

  const userExist = testDataBase.find(user => user.name === name);
  const passwordCorrect = userExist?.password === password;
  if (!userExist) {
    rej({
      name: ErrorName.NAME,
      message: "User with this name doesn't exist",
    });
  }
  if (!passwordCorrect) {
    rej({
      name: ErrorName.PASSWORD,
      message: "Wrong password",
    });
  }

  setTimeout(() => {
    res(userExist);
  }, 3000)
})

export const useAuth = (signin?: boolean) => {
  const router = useRouter();
  const [ nameValid, setNameValid ] = React.useState(true);
  const [ emailValid, setEmailValid ] = React.useState(true);
  const [ passwordValid, setPasswordValid ] = React.useState(true);
  const [ secondPasswordValid, setSecondPasswordValid ] = React.useState(true);
  const [ loading, setLoading ] = React.useState(false);
  const [ signUpError, setSignUpError ] = React.useState("");
  const [ signInError, setSignInError ] = React.useState("");

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
    setSignUpError("");
    setSignInError("");

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
      setSignUpError("");
      router.replace("/photos/1");
      setLoading(false);      
    } catch (error: any) {
      if (error.name === ErrorName.NAME_EMAIL) {
        setNameValid(false);
        setEmailValid(false);
      }
      if (error.name === ErrorName.NAME) {
        setNameValid(false);
      }
      if (error.name === ErrorName.EMAIL) {
        setEmailValid(false);
      }
      setSignUpError(error.message);
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
      setSignInError("");
      router.replace("/photos/1");
      setLoading(false);

      // if (isAuth) {
      //   setSignInError(false);
      //   router.replace("/photos/1");
      // } else {
      //   setNameValid(false);
      //   setPasswordValid(false);
      //   setSignInError(true);
      //   console.log("Name or password are incorrect!");
      // }
      // setLoading(false);   
    } catch (error: any) {
      setNameValid(false);
      setPasswordValid(false);
      setSignInError(error.message);
      setLoading(false); 
    }
  }

  return {
    signUp,
    signIn,
    onTyping,
    onFocus,
  
    signUpError,
    signInError,
    nameValid,
    emailValid,
    passwordValid,
    secondPasswordValid,
    submitButtonLoader: loading,
  }
}