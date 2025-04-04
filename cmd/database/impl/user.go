package impl

import (
	"fmt"
	"manage-wise/cmd/domain"

	"gorm.io/gorm"
)

type IUserRepository interface {
	Add(user *domain.UserPayload) (*domain.UserPayload, error)
}

type userRepository struct {
	db *gorm.DB
}

// change to User after
func (c *userRepository) Add(user *domain.UserPayload) (*domain.UserPayload, error) {
	result := c.db.Create(&user)
	if result.Error != nil {
		return nil, fmt.Errorf("erro ao criar o usuário no banco")
	}

	return user, nil
}

func NewUserRepository(db *gorm.DB) IUserRepository {
	return &userRepository{db: db}
}
