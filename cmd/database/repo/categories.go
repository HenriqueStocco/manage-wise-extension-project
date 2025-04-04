package repo

import (
	"context"
	"manage-wise/cmd/domain"
)

type ICategoryRepository interface {
	Add(ctx context.Context, category *domain.Category) (*domain.Category, error)
}
