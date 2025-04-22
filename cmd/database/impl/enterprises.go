package impl

import (
	"fmt"
	"manage-wise/cmd/domain"

	"gorm.io/gorm"
)

type IEnterpriseRepository interface {
	Add(enterprise *domain.EnterprisePayload) (*domain.Enterprise, error)
	Update(enterpriseID string, enterprise *domain.EnterprisePayload) (*domain.Enterprise, error)
}

type enterpriseRepository struct {
	db *gorm.DB
}

// Add implements IEnterpriseRepository.
func (e *enterpriseRepository) Add(enterprise *domain.EnterprisePayload) (*domain.Enterprise, error) {
	var enterpriseReturned *domain.Enterprise
	enterpriseInsert := &domain.Enterprise{
		Name:     enterprise.Name,
		Document: enterprise.Document,
		Phone:    enterprise.Phone,
	}
	err := e.db.Create(&enterpriseInsert).Scan(&enterpriseReturned)
	if err.Error != nil {
		return nil, fmt.Errorf("erro ao criar a empresa.\n%s", err.Error)
	}

	return enterpriseReturned, nil
}

// Update implements IEnterpriseRepository.
func (e *enterpriseRepository) Update(enterpriseID string, enterprise *domain.EnterprisePayload) (*domain.Enterprise, error) {
	var existingEnterprise *domain.Enterprise
	err := e.db.Where("ID = ?", enterpriseID).First(&existingEnterprise)
	if err.Error != nil {
		return nil, fmt.Errorf("erro ao procurar a empresa dentro do banco, %s", err.Error)
	}

	existingEnterprise.Name = enterprise.Name
	existingEnterprise.Document = enterprise.Document
	existingEnterprise.Phone = enterprise.Phone
	e.db.Save(&existingEnterprise)

	return existingEnterprise, nil
}

func NewEnterpriseRepository(db *gorm.DB) IEnterpriseRepository {
	return &enterpriseRepository{db: db}
}
