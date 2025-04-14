package services

import (
	"context"
	"fmt"
	"manage-wise/cmd/database/impl"
	d "manage-wise/cmd/domain"
	"manage-wise/cmd/utils"
)

type IAuthService interface {
	Register(ctx context.Context, user *d.UserPayload) error
	Login(ctx context.Context, user *d.UserLoginPayload) (*d.User, error)
}

type loginService struct {
	UserRepository impl.IUserRepository
}

// Login implements ILoginService.
// will return token
func (l *loginService) Login(ctx context.Context, user *d.UserLoginPayload) (*d.User, error) {
	result, err := l.UserRepository.VerifyByEmail(user.Email)
	if err != nil {
		return nil, fmt.Errorf("erro no serviço de login:\n%+v", err.Error())
	}

	passwordResult := utils.CheckPassword(user.Password, result.Password)
	if !passwordResult {
		return nil, fmt.Errorf("senha incorreta")
	}
	return result, nil
}

// Register implements ILoginService.
func (l *loginService) Register(ctx context.Context, user *d.UserPayload) error {
	err := l.UserRepository.VerifyRegister(user.Email)
	if err != nil {
		return fmt.Errorf("erro no serviço de registro ao validar o usuário\n%s", err.Error())
	}

	hashedPassword, err := utils.HashPassword(user.Password)

	if err != nil {
		return fmt.Errorf("erro ao encriptografar a senha do usuário\n%s", err.Error())
	}

	user.Password = hashedPassword

	_, err = l.UserRepository.Add(user)
	if err != nil {
		return fmt.Errorf("erro no serviço de registro ao inserir o usuário\n%s", err.Error())
	}

	return nil
}

func NewAuthService(userRepo impl.IUserRepository) IAuthService {
	return &loginService{
		UserRepository: userRepo,
	}
}
