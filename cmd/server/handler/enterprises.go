package handler

import (
	"encoding/json"
	"fmt"
	"manage-wise/cmd/domain"
	"manage-wise/cmd/services"
	"manage-wise/cmd/utils"
	"net/http"
)

type IEnterpriseHandler interface {
	Add(w http.ResponseWriter, r *http.Request)
}

type enterpriseHandler struct {
	enterpriseService services.IEnterpriseServices
}

// Add implements IEnterpriseHandler.
func (e *enterpriseHandler) Add(w http.ResponseWriter, r *http.Request) {
	var enterprise *domain.EnterprisePayload
	ctx := r.Context()

	err := json.NewDecoder(r.Body).Decode(&enterprise)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	userToken, err := r.Cookie("auth_token")
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	user, err := utils.AuthenticateUserByToken(userToken.Value)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = e.enterpriseService.CreateEnterprise(ctx, enterprise, user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	fmt.Fprintf(w, "enterprise criada com sucesso!")
}

func NewEnterpriseHandler(enterpriseService services.IEnterpriseServices) IEnterpriseHandler {
	return &enterpriseHandler{
		enterpriseService: enterpriseService,
	}
}
