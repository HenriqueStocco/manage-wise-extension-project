package handler

import (
	"fmt"
	"net/http"
)

type ITestHandler interface {
	AuthTest(w http.ResponseWriter, r *http.Request)
}

type testHandler struct{}

// AuthTest implements ITestHandler.
func (t *testHandler) AuthTest(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "tem que estar autenticado")
}

func NewTestHandler() ITestHandler {
	return &testHandler{}
}
