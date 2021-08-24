export enum Endpoint {
  RegisterUserEndpoint = "/register_user",
  LoginUserEndpoint = "/login_user",
  UpdateUserEndpoint = "/update_user",
}

export interface RegisterUserInput {
    username: string,
    email: string,
    password: string,
}

export interface LoginUserInput {
    email: string,
    password: string,
}