package handler

import (
	"manage-wise/cmd/server/services"
	"net/http"
)

type ILoginHandler interface {
	Login(w http.ResponseWriter, r *http.Request)
	Register(w http.ResponseWriter, r *http.Request)
}

type loginHandler struct {
	loginRepository *services.ILoginService
}

// Register implements ILoginHandler.
func (l *loginHandler) Register(w http.ResponseWriter, r *http.Request) {
	panic("unimplemented")
}

// Login implements ILoginHandler.
func (l *loginHandler) Login(w http.ResponseWriter, r *http.Request) {
	panic("unimplemented") // fzr aqui
}

func NewLoginHandler(loginRepo *services.ILoginService) ILoginHandler {
	return &loginHandler{
		loginRepository: loginRepo,
	}
}
