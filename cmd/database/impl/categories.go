package impl

import (
	"context"
	"database/sql"
	"manage-wise/cmd/database/repo"
	"manage-wise/cmd/domain"
)

type categoryRepository struct {
	db *sql.DB
}

func (c *categoryRepository) Add(ctx context.Context, category *domain.Category) (*domain.Category, error) {
	panic("unimplemented")
}

func NewCategoryRepository(db *sql.DB) repo.ICategoryRepository {
	return &categoryRepository{db: db}
}
