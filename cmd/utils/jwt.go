package utils

import (
	"fmt"
	"manage-wise/cmd/domain"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

type CustomClaims struct {
	User *domain.UserPayload `json:"user"`
	jwt.RegisteredClaims
}

func CreateJwtCookie(user *domain.UserPayload, ctx http.ResponseWriter) error {
	claims := CustomClaims{
		User: user,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			Issuer:    "my-app-issuer",
			Subject:   user.Username, // trocar para ID dps
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString([]byte("metalica")) // trocar para getenv(secretKey)
	if err != nil {
		return fmt.Errorf("erro ao gerar o token")
	}

	cookie := &http.Cookie{
		Name:     "auth_token",
		Value:    tokenString,
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteLaxMode,
		Path:     "/",
		MaxAge:   int(24 * time.Hour.Seconds()),
	}

	http.SetCookie(ctx, cookie)
	return nil
}

func AuthenticateUserByToken(tokenString string) (*domain.UserPayload, error) {
	secret := "metalica"
	if secret == "" {
		return nil, fmt.Errorf("configuração de segurança faltante")
	}

	token, err := jwt.ParseWithClaims(tokenString, &CustomClaims{}, func(t *jwt.Token) (interface{}, error) {
		// Validar método de assinatura
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("método de assinatura inválido: %v", t.Header["alg"])
		}
		return []byte(secret), nil
	})

	if err != nil {
		return nil, fmt.Errorf("falha na autenticação: %w", err)
	}

	if !token.Valid {
		return nil, fmt.Errorf("token inválido")
	}

	claims, ok := token.Claims.(*CustomClaims)
	if !ok || claims.Issuer != "my-app-issuer" {
		return nil, fmt.Errorf("credenciais inválidas")
	}

	return claims.User, nil
}
