export enum AuthFormField {
  NAME = "name",
  EMAIL = "email",
  PASSWORD = "password",
  SECOND_PASSWORD = "secondPassword",
}

export enum AuthFormPlaceholder {
  NAME = "Enter your name",
  EMAIL = "Enter your email",
  PASSWORD = "Password",
  SECOND_PASSWORD = "Repeat password",
}

export enum AuthButtonType {
  SIGN_UP = "signup",
  SIGN_IN = "signin",
}

export type AuthForm = {
  [key in Exclude<AuthFormField, AuthFormField.SECOND_PASSWORD | AuthFormField.EMAIL>]: string;
} & Partial<{
  [key in AuthFormField.SECOND_PASSWORD | AuthFormField.EMAIL]: string;
}>;