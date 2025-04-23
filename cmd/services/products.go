package services

import (
	"fmt"
	"manage-wise/cmd/database/impl"
	"manage-wise/cmd/domain"
)

type IProductsService interface {
	Add(product *domain.ProductPayload, category *domain.Categories) error
	GetAllProducts() ([]domain.Products, error)
	GetAllProductsByCategory(category *domain.Categories) ([]domain.Products, error)
	GetAllProductsBySection(sector string) ([]domain.Products, error)
}

type productsService struct {
	productsRepository impl.IProductsRepostory
}

// Add implements IProductsService.
func (p *productsService) Add(product *domain.ProductPayload, category *domain.Categories) error {
	err := p.productsRepository.Add(product, category)
	if err != nil {
		return fmt.Errorf("%s", err.Error())
	}
	return nil
}

// GetAllProducts implements IProductsService.
func (p *productsService) GetAllProducts() ([]domain.Products, error) {
	listOfProducts, err := p.productsRepository.GetAll()
	if err != nil {
		return nil, fmt.Errorf("%s", err.Error())
	}

	return listOfProducts, nil
}

// GetAllProductsByCategory implements IProductsService.
func (p *productsService) GetAllProductsByCategory(category *domain.Categories) ([]domain.Products, error) {
	listOfProducts, err := p.productsRepository.ListByCategory(category)
	if err != nil {
		return nil, fmt.Errorf("%s", err.Error())
	}

	return listOfProducts, nil
}

// GetAllProductsBySection implements IProductsService.
func (p *productsService) GetAllProductsBySection(sector string) ([]domain.Products, error) {
	listOfProducts, err := p.productsRepository.ListBySector(sector)
	if err != nil {
		return nil, fmt.Errorf("%s", err.Error())
	}

	return listOfProducts, nil
}

func NewProductService(productRepo impl.IProductsRepostory) IProductsService {
	return &productsService{
		productsRepository: productRepo,
	}
}
