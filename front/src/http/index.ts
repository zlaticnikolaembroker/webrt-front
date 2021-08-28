export enum Endpoint {
  RegisterUserEndpoint = "/register_user",
  LoginUserEndpoint = "/login_user",
  UpdateUserEndpoint = "/update_user",
  GetUserByIdEndpoint = "/get_user_by_id",
  CreateMeetingEndpoint = "/create_meeting",
  GetMeetingByNumberEndpoint = "/get_meeting_by_number",
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

export interface GetUserByIdInput {
    id: number,
}


export interface UpdateUserInput {
    id: number,
    username: string,
    email: string,
    password: string,
}

export interface CreateMeetingInput {
  meetingNumber: number,
}

export interface GetMeetingByNumberInput {
  meetingNumber: number,
}