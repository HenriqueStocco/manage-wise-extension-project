package database

import (
	"manage-wise/cmd/domain"

	"gorm.io/gorm"
)

type Database struct {
	db *gorm.DB
}

func NewDatabase(db *gorm.DB) *Database {
	return &Database{
		db: db,
	}
}

func Migrate(db *gorm.DB) {
	db.AutoMigrate(&domain.UserPayload{}) // substitute this after
} // do the migrations
