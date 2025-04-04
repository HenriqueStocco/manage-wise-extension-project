package handler

import "net/http"

type ICategoryHandler interface {
	CreateCategory(w http.ResponseWriter, r *http.Request)
}
