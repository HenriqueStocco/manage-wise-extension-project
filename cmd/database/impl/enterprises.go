package impl

import "manage-wise/cmd/domain"

type IEnterpriseRepository interface {
	Add(enterprise *domain.EnterprisePayload) error
	Update(enterprise *domain.EnterprisePayload) error
}
