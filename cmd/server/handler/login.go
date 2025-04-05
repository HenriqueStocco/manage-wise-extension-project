package handler

import (
	"encoding/json"
	"fmt"
	"manage-wise/cmd/domain"
	"manage-wise/cmd/services"
	"manage-wise/cmd/utils"
	"net/http"
)

type ILoginHandler interface {
	Login(w http.ResponseWriter, r *http.Request)
	Register(w http.ResponseWriter, r *http.Request)
}

type loginHandler struct {
	loginService services.ILoginService
}

// Register implements ILoginHandler.
func (l *loginHandler) Register(w http.ResponseWriter, r *http.Request) {
	panic("unimplemented")
}

// Login implements ILoginHandler.
func (l *loginHandler) Login(w http.ResponseWriter, r *http.Request) {
	var u *domain.UserPayload
	ctx := r.Context()

	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	userInserted, err := l.loginService.Login(ctx, u)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	utils.CreateJwtCookie(userInserted, w)

	fmt.Fprintf(w, "Person: %+v\n", userInserted)
}

func NewLoginHandler(loginRepo services.ILoginService) ILoginHandler {
	return &loginHandler{
		loginService: loginRepo,
	}
}
