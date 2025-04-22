package domain

import (
	"time"

	"github.com/google/uuid"
)

type Category struct {
	ID int
}

type User struct {
	ID        uuid.UUID `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Username  string
	Email     string `gorm:"unique"`
	Password  string
	CreatedAt time.Time
}

type Enterprise struct {
	ID        uuid.UUID `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Name      string    `gorm:"unique"`
	Document  string    `gorm:"unique"`
	Phone     string
	CreatedAt time.Time
}

type UserToEnterprise struct {
	ID           uuid.UUID  `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	UserId       uuid.UUID  `gorm:"foreignKey:UserId;references:ID"`
	User         User       `gorm:"foreignKey:UserId"`
	EnterpriseId uuid.UUID  `gorm:"foreignKey:EnterpriseId;references:ID"`
	Enterprise   Enterprise `gorm:"foreignKey:EnterpriseId"`
	CreatedAt    time.Time
}
