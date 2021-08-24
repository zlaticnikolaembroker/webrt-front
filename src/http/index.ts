export enum Endpoint {
  RegisterUserEndpoint = "/register_user",
  LoginUserEndpoint = "/login_user",
  UpdateUserEndpoint = "/update_user",
}

export interface RegisterUserInput {
    username: string,
    password: string,
}

export interface LoginUserInput {
    username: string,
    password: string,
}