package middleware

import (
	"context"
	"manage-wise/cmd/utils"
	"net/http"
)

type contextKey string

func AuthenticationMiddleware(handlerWrapper http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var user contextKey = "user"
		cookie, err := r.Cookie("auth_token")
		if err != nil {
			http.Error(w, "token de autenticação não encontrado\n", http.StatusUnauthorized)
			return
		}

		userAuthenticated, err := utils.AuthenticateUserByToken(cookie.Value)
		if err != nil {
			http.Error(w, "erro na autenticação do usuário\n", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), user, userAuthenticated)
		r = r.WithContext(ctx)
		handlerWrapper(w, r)
	}
}
