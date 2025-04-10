package services

import (
	"context"
	"fmt"
	"manage-wise/cmd/database/impl"
	d "manage-wise/cmd/domain"
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

	// pmds isso é só um teste
	// usar bcrypt dps e tirar essa validação porca
	if user.Password != result.Password {
		return nil, fmt.Errorf("erro no serviço de login, validação de senha\nSenhaUsuario:%s\nSenhaBanco:%s",
			user.Password,
			result.Password)
	}

	return result, nil
}

// Register implements ILoginService.
func (l *loginService) Register(ctx context.Context, user *d.UserPayload) error {
	_, err := l.UserRepository.VerifyByEmail(user.Email)
	if err != nil {
		return fmt.Errorf("erro no serviço de registro ao validar o usuário")
	}

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
