package impl

import (
	"context"
	"manage-wise/cmd/domain"

	"gorm.io/gorm"
)

type ICategoryRepository interface {
	Add(ctx context.Context, category *domain.Category) (*domain.Category, error)
}

type categoryRepository struct {
	db *gorm.DB
}

func (c *categoryRepository) Add(ctx context.Context, category *domain.Category) (*domain.Category, error) {
	panic("unimplemented")
}

func NewCategoryRepository(db *gorm.DB) ICategoryRepository {
	return &categoryRepository{db: db}
}
