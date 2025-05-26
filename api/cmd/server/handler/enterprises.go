package handler

import (
	"encoding/json"
	"fmt"
	"manage-wise/cmd/domain"
	"manage-wise/cmd/middleware"
	"manage-wise/cmd/services"
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
	var userKey middleware.ContextKey = "user"

	err := json.NewDecoder(r.Body).Decode(&enterprise)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	user := ctx.Value(userKey).(*domain.User)

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
