package services

import (
	"context"
	"fmt"
	"manage-wise/cmd/database/impl"
	"manage-wise/cmd/domain"
)

type IEnterpriseServices interface {
	CreateEnterprise(ctx context.Context, enterprise *domain.EnterprisePayload, user *domain.User) error
}

type enterpriseServices struct {
	enterpriseRepository impl.IEnterpriseRepository
}

func (e *enterpriseServices) CreateEnterprise(
	ctx context.Context,
	enterprise *domain.EnterprisePayload,
	user *domain.User,
) error {
	_, err := e.enterpriseRepository.Add(enterprise, user)
	if err != nil {
		return fmt.Errorf("erro ao criar enterprise pelo repositório %s", err.Error())
	}

	return nil
}

func NewEnterpriseService(repository impl.IEnterpriseRepository) IEnterpriseServices {
	return &enterpriseServices{
		enterpriseRepository: repository,
	}
}
