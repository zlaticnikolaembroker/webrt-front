package api

import (
	"../services/meeting"
	"../services/user"
)

type Api struct {
	UserService    user.Service
	MeetingService meeting.Service
}

type RegisterUserInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Username string `json:"username"`
}

func (api Api) RegisterUser(input RegisterUserInput) (error, int) {
	return api.UserService.Register(user.RegisterUserInput{
		Email:    input.Email,
		Password: input.Password,
		Username: input.Username,
	})
}

type LoginUserInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (api Api) LoginUser(input LoginUserInput) (error, *user.User) {
	return api.UserService.Login(user.LoginUserInput{
		Email:    input.Email,
		Password: input.Password,
	})
}

type UpdateUserInput struct {
	Id       int
	Email    string
	Password string
	Username *string
}

func (api Api) UpdateUser(input UpdateUserInput) error {
	return api.UserService.Update(user.UpdateUserInput{
		Id:       input.Id,
		Email:    input.Email,
		Password: input.Password,
		Username: input.Username,
	})
}

type GetUserById struct {
	Id int
}

func (api Api) GetUserById(input GetUserById) (error, *user.User) {
	return api.UserService.GetById(input.Id)
}

type CreateMeetingInput struct {
	MeetingNumber int
}

func (api Api) CreateMeeting(input CreateMeetingInput) (error, *meeting.Meeting) {
	return api.MeetingService.CreateMeeting(input.MeetingNumber)
}

type GetMeetingByNumberInput struct {
	MeetingNumber int
}

func (api Api) GetMeetingById(input GetMeetingByNumberInput) (error, *meeting.Meeting) {
	return api.MeetingService.GetMeetingByNumber(input.MeetingNumber)
}