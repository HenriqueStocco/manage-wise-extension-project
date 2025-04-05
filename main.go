package main

import (
	"manage-wise/cmd/database"
	"manage-wise/cmd/server"
	"net/http"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// do the db connection
	dsn := "host=localhost port=5432 user=orbit password=inorbit dbname=orbit sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("erro ao conectar ao database")
	}

	database.Migrate(db)
	mux := http.NewServeMux()
	server := server.NewHttpServer(":5050", mux)
	server.AlocateContainers(db) // pass db here
	server.Serve()
}
