package services

import (
	"context"
	"fmt"
	"manage-wise/cmd/database/impl"
	d "manage-wise/cmd/domain"
)

type ILoginService interface {
	Register(ctx context.Context, user *d.UserPayload) error
	Login(ctx context.Context, user *d.UserPayload) (*d.UserPayload, error)
}

type loginService struct {
	UserRepository impl.IUserRepository
}

// Login implements ILoginService.
// will return token
func (l *loginService) Login(ctx context.Context, user *d.UserPayload) (*d.UserPayload, error) {
	result, err := l.UserRepository.Add(user)
	if err != nil {
		return nil, fmt.Errorf("erro ao repassar dados ao repositório do usuário para criação no banco")
	}

	return result, nil
}

// Register implements ILoginService.
func (l *loginService) Register(ctx context.Context, user *d.UserPayload) error {
	panic("unimplemented")
}

func NewLoginService(userRepo impl.IUserRepository) ILoginService {
	return &loginService{
		UserRepository: userRepo,
	}
}
