package user

import (
	"errors"
)

type ServiceImplementation struct {
	UserList []User
}

func NewServiceImplementation() *ServiceImplementation {
	return &ServiceImplementation{UserList: make([]User, 0)}
}

func (service *ServiceImplementation) Register(input RegisterUserInput) (error, int) {
	service.UserList = append(service.UserList, User{
		Id:       len(service.UserList),
		Email:    input.Email,
		Password: input.Password,
		Username: &input.Username,
	})
	return nil, len(service.UserList) - 1
}

func (service *ServiceImplementation) Login(input LoginUserInput) (error, *User) {

	for _, user := range service.UserList {
		if user.Email == input.Email && user.Password == input.Password {
			return nil, &user
		}
	}

	return errors.New("user_not_found"), nil
}

func (service *ServiceImplementation) Update(input UpdateUserInput) error {
	for index, user := range service.UserList {
		if user.Id == input.Id {
			service.UserList[index].Username = input.Username
			service.UserList[index].Password = input.Password
			service.UserList[index].Username = input.Username
			return nil
		}
	}

	return errors.New("user_not_found")
}

func (service *ServiceImplementation) GetById(id int) (error, *User) {
	if len(service.UserList) < id {
		return errors.New("user_not_found") ,nil
	}
	return nil, &service.UserList[id]
}