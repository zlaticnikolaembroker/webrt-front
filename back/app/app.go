package app

import (
	"../api"
	"../services/meeting"
	"../services/user"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type App struct {
	Api api.Api
}

func NewApp() *App {
	app := &App{}
	app.initialize()
	return app
}

func (app *App) initialize() {
	app.Api = api.Api{
		UserService:    user.NewServiceImplementation(),
		MeetingService: meeting.NewServiceImplementation(),
	}
}

func (app *App) ListenAndServe() {
	app.setHandlers()
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		panic(err)
	}
}

func queryParams(r *http.Request) []byte {
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	return reqBody
}

func enableCors(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
}

func (app *App) registerUserHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w)
	defer func() {
		if r := recover(); r != nil {
			fmt.Println(r)
			w.Write([]byte("error"))
		}
	}()

	requestBody := queryParams(r)

	var registerUserInput api.RegisterUserInput
	err := json.Unmarshal(requestBody, &registerUserInput)

	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}

	err2, result := app.Api.RegisterUser(registerUserInput)

	if err2 != nil {
		w.Write([]byte(err2.Error()))
		return
	}

	jsonResult, err3 := json.Marshal(result)

	if err3 != nil {
		w.Write([]byte(err3.Error()))
		return
	}

	w.Write(jsonResult)
}

func (app *App) loginUserHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w)
	defer func() {
		if r := recover(); r != nil {
			fmt.Println("******")
			w.Write([]byte("error"))
		}
	}()

	requestBody := queryParams(r)

	var loginUserInput api.LoginUserInput

	err := json.Unmarshal(requestBody, &loginUserInput)

	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}

	err2, result := app.Api.LoginUser(loginUserInput)

	if err2 != nil && err2.Error() != "user_not_found" {
		w.Write([]byte(err2.Error()))
		return
	}

	jsonResult, err3 := json.Marshal(result)

	if err3 != nil {
		w.Write([]byte(err3.Error()))
		return
	}

	w.Write(jsonResult)
}

func (app *App) updateUserHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w)
	defer func() {
		if r := recover(); r != nil {
			fmt.Println(r)
			w.Write([]byte("error"))
		}
	}()

	requestBody := queryParams(r)

	var updateUserInput api.UpdateUserInput

	err := json.Unmarshal(requestBody, &updateUserInput)

	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}

	err2 := app.Api.UpdateUser(updateUserInput)

	if err2 != nil {
		w.Write([]byte(err2.Error()))
		return
	}

	jsonResult, err3 := json.Marshal(true)

	if err3 != nil {
		w.Write([]byte(err3.Error()))
		return
	}

	w.Write(jsonResult)
}

func (app *App) getUserByIdHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w)
	defer func() {
		if r := recover(); r != nil {
			w.Write([]byte("error"))
		}
	}()

	requestBody := queryParams(r)

	var getUserById api.GetUserById

	err := json.Unmarshal(requestBody, &getUserById)

	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}

	err2, user := app.Api.GetUserById(getUserById)

	if err2 != nil {
		w.Write([]byte(err2.Error()))
		return
	}

	jsonResult, err3 := json.Marshal(user)

	if err3 != nil {
		w.Write([]byte(err3.Error()))
		return
	}

	w.Write(jsonResult)
}

func (app *App) createMeetingHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w)
	defer func() {
		if r := recover(); r != nil {
			w.Write([]byte("error"))
		}
	}()

	requestBody := queryParams(r)

	var createMeetingInput api.CreateMeetingInput

	err := json.Unmarshal(requestBody, &createMeetingInput)

	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}

	err2, meeting := app.Api.CreateMeeting(createMeetingInput)

	if err2 != nil {
		w.Write([]byte(err2.Error()))
		return
	}

	jsonResult, err3 := json.Marshal(meeting)

	if err3 != nil {
		w.Write([]byte(err3.Error()))
		return
	}

	w.Write(jsonResult)
}

func (app *App) getMeetingByNumberHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(w)
	defer func() {
		if r := recover(); r != nil {
			w.Write([]byte("error"))
		}
	}()

	requestBody := queryParams(r)

	var getMeetingByIdInput api.GetMeetingByNumberInput

	err := json.Unmarshal(requestBody, &getMeetingByIdInput)

	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}

	err2, meeting := app.Api.GetMeetingById(getMeetingByIdInput)

	if err2 != nil {
		w.Write([]byte(err2.Error()))
		return
	}

	jsonResult, err3 := json.Marshal(meeting)

	if err3 != nil {
		w.Write([]byte(err3.Error()))
		return
	}

	w.Write(jsonResult)
}

func (app *App) setHandlers() {
	http.HandleFunc("/register_user", app.registerUserHandler)
	http.HandleFunc("/login_user", app.loginUserHandler)
	http.HandleFunc("/update_user", app.updateUserHandler)
	http.HandleFunc("/get_user_by_id", app.getUserByIdHandler)
	http.HandleFunc("/create_meeting", app.createMeetingHandler)
	http.HandleFunc("/get_meeting_by_number", app.getMeetingByNumberHandler)
}
