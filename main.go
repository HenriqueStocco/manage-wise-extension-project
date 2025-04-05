package main

import (
	"manage-wise/cmd/server"
	"net/http"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	// do the db connection
	dsn := ""
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("erro ao conectar ao database")
		return
	}

	mux := http.NewServeMux()
	server := server.NewHttpServer(":5050", mux)
	server.AlocateContainers(db) // pass db here
	server.Serve()
}
