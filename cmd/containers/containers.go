package containers

import (
	"manage-wise/cmd/database/impl"
	"manage-wise/cmd/server/handler"
	"manage-wise/cmd/services"

	"gorm.io/gorm"
)

func LoginContainer(db *gorm.DB) handler.ILoginHandler {
	userRepo := impl.NewUserRepository(db)
	loginService := services.NewAuthService(userRepo)
	loginHandler := handler.NewAuthHandler(loginService)
	return loginHandler
}

func TestContainer() handler.ITestHandler {
	testHandler := handler.NewTestHandler()
	return testHandler
}

func EnterpriseContainer(db *gorm.DB) handler.IEnterpriseHandler {
	enterpriseRepo := impl.NewEnterpriseRepository(db)
	enterprseService := services.NewEnterpriseService(enterpriseRepo)
	enterpriseHandler := handler.NewEnterpriseHandler(enterprseService)
	return enterpriseHandler
}
