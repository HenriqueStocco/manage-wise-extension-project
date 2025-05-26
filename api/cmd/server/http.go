package server

import (
	"manage-wise/cmd/containers"
	m "manage-wise/cmd/middleware"
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
	l := containers.LoginContainer(db)
	e := containers.EnterpriseContainer(db)
	t := containers.TestContainer()

	h.Server.HandleFunc("GET /api/test", m.AuthenticationMiddleware(t.AuthTest))
	h.Server.HandleFunc("POST /api/register", l.Register)
	h.Server.HandleFunc("POST /api/login", l.Login)
	h.Server.HandleFunc("POST /api/enterprises/add", m.AuthenticationMiddleware(e.Add))
}
