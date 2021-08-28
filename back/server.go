package main

import (
	"./app"
	"fmt"
)


func main() {
	fmt.Println("Starting the server on port 8080")
	application := app.NewApp()
	application.ListenAndServe()
}