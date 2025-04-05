package server

import (
	"manage-wise/cmd/containers"
	"net/http"

	"gorm.io/gorm"
)

type HttpServer struct {
	Addr   string
	Server *http.ServeMux
}

func NewHttpServer(addr string, mux *http.ServeMux) *HttpServer {
	return &HttpServer{
		Addr:   addr,
		Server: mux,
	}
}

func (h *HttpServer) Serve() {
	http.ListenAndServe(h.Addr, h.Server)
}

func (h *HttpServer) AlocateContainers(db *gorm.DB) {
	loginHandler := containers.LoginContainer(db)

	h.Server.HandleFunc("/api/login", loginHandler.Login)
}
