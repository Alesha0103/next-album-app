export enum AuthFormField {
  NAME = "name",
  EMAIL = "email",
  PASSWORD = "password",
  SECOND_PASSWORD = "secondPassword",
}

export type AuthForm = {
  [key in Exclude<AuthFormField, AuthFormField.SECOND_PASSWORD>]: string;
} & {
  [AuthFormField.SECOND_PASSWORD]?: string
}