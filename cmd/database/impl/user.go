package impl

import (
	"fmt"
	"manage-wise/cmd/domain"

	"gorm.io/gorm"
)

type IUserRepository interface {
	Add(user *domain.UserPayload) (*domain.User, error)
	Verify(user *domain.UserPayload) error
}

type userRepository struct {
	db *gorm.DB
}

// change to User after
func (c *userRepository) Add(user *domain.UserPayload) (*domain.User, error) {
	userPayload := domain.User{
		Username: user.Username,
		Email:    user.Email,
		Password: user.Password,
	}
	result := c.db.Create(&userPayload)
	if result.Error != nil {
		return nil, fmt.Errorf("erro ao criar o usuário no banco")
	}

	return &userPayload, nil
}

func (c *userRepository) Verify(user *domain.UserPayload) error {
	var existingUser domain.User
	result := c.db.Where("email = ?", user.Email).First(&existingUser)
	if result.Error != nil {
		return fmt.Errorf("erro ao validar o usuário")
	}

	if result.RowsAffected == 0 {
		return fmt.Errorf("usuário não encontrado no banco de dados")
	}

	return nil
}

func NewUserRepository(db *gorm.DB) IUserRepository {
	return &userRepository{db: db}
}
