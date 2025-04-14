package impl

import (
	"fmt"
	"manage-wise/cmd/domain"

	"gorm.io/gorm"
)

type IUserRepository interface {
	Add(user *domain.UserPayload) (*domain.User, error)
	VerifyByEmail(userEmail string) (*domain.User, error)
	VerifyRegister(userEmail string) error
}

type userRepository struct {
	db *gorm.DB
}

// VerifyRegister implements IUserRepository.
func (c *userRepository) VerifyRegister(userEmail string) error {
	var existingUser *domain.User
	result := c.db.Where("email = ?", userEmail).First(&existingUser)
	if result.RowsAffected != 0 {
		return fmt.Errorf("usuário encontrado no bancod e dados")
	}
	return nil
}

// change to User after
func (c *userRepository) Add(user *domain.UserPayload) (*domain.User, error) {
	var userResult *domain.User
	userPayload := domain.User{
		Username: user.Username,
		Email:    user.Email,
		Password: user.Password,
	}
	result := c.db.Create(&userPayload).Scan(&userResult)
	if result.Error != nil {
		return nil, fmt.Errorf("erro ao criar o usuário no banco\n%+v", result.Error)
	}

	return userResult, nil
}

func (c *userRepository) VerifyByEmail(userEmail string) (*domain.User, error) {
	var existingUser *domain.User
	result := c.db.Where("email = ?", userEmail).First(&existingUser)
	if result.Error != nil {
		return nil, fmt.Errorf("erro ao validar o usuário\n%s", result.Error.Error())
	}

	if result.RowsAffected == 0 {
		return nil, fmt.Errorf("usuário não encontrado no banco de dados")
	}

	return existingUser, nil
}

func NewUserRepository(db *gorm.DB) IUserRepository {
	return &userRepository{db: db}
}
