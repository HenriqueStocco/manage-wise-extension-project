package utils

import (
	"fmt"
	"manage-wise/cmd/domain"
	"net/http"

	"github.com/golang-jwt/jwt/v4"
)

func CreateJwtCookie(user *domain.UserPayload, ctx *http.Request) error {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user": user,
	})

	tokenString, err := token.SignedString([]byte("balasn"))
	if err != nil {
		return fmt.Errorf("erro ao gerar o token do usuário")
	}

	cookie := http.Cookie{Name: "user", Value: tokenString}
	ctx.AddCookie(&cookie)

	return nil
}
