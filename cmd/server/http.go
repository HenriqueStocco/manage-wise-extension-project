package server

import "net/http"

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
