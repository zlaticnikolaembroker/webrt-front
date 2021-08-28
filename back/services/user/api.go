package user

type RegisterUserInput struct {
	Email string
	Password string
	Username string
}

type LoginUserInput struct {
	Email string
	Password string
}

type UpdateUserInput struct {
	Id int
	Email string
	Password string
	Username *string
}

type User struct {
	Id int `json:"id"`
	Email string `json:"email"`
	Password string `json:"password"`
	Username *string `json:"username"`
}

type Service interface {
	Register(input RegisterUserInput) (error, int)
	Login(input LoginUserInput) (error, *User)
	Update(input UpdateUserInput) error
	GetById(id int) (error, *User)
}
