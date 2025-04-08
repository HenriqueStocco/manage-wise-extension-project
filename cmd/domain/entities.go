package domain

import (
	"github.com/google/uuid"
)

type Category struct {
	ID int
}

type User struct {
	ID       uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Username string    `json:"username"`
	Email    string    `json:"email" gorm:"unique"`
	Password string    `json:"password"`
}

type Enterprise struct {
	ID       uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Name     string
	Document string
	Phone    string
}
