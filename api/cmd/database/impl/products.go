package impl

import (
	"fmt"
	"manage-wise/cmd/domain"

	"gorm.io/gorm"
)

type IProductsRepostory interface {
	GetAll() ([]domain.Products, error)
	ListByCategory(category *domain.Categories) ([]domain.Products, error)
	ListBySector(sector string) ([]domain.Products, error)
	Add(product *domain.ProductPayload, category *domain.Categories) error
}

type productsRepository struct {
	db *gorm.DB
}

// Add implements IProductsRepostory.
func (p *productsRepository) Add(product *domain.ProductPayload, category *domain.Categories) error {
	productPayload := &domain.Products{
		CategoryId:  category.ID,
		Name:        product.Name,
		Description: product.Description,
		Sector:      product.Sector,
		ImageName:   product.ImageName,
		ImageType:   product.ImageType,
	}

	if err := p.db.Create(productPayload).Error; err != nil {
		return fmt.Errorf("erro ao criar produto: %s", err.Error())
	}

	return nil
}

// GetAll implements IProductsRepostory.
func (p *productsRepository) GetAll() ([]domain.Products, error) {
	var allProducts []domain.Products
	result := p.db.Find(&allProducts)
	if result.Error != nil {
		return nil, fmt.Errorf("erro ao pegar todos os produtos %s", result.Error)
	}

	return allProducts, nil
}

// ListByCategory implements IProductsRepostory.
func (p *productsRepository) ListByCategory(category *domain.Categories) ([]domain.Products, error) {
	var allProductsByCategory []domain.Products
	result := p.db.Where("category_id = ?", category.ID).Find(&allProductsByCategory)
	if result.Error != nil {
		return nil, fmt.Errorf("erro ao listar os produtos por categoria %s", result.Error)
	}

	return allProductsByCategory, nil
}

// ListBySector implements IProductsRepostory.
func (p *productsRepository) ListBySector(sector string) ([]domain.Products, error) {
	var allProductsBySector []domain.Products
	result := p.db.Where("sector = ?", sector).Find(&allProductsBySector)

	if result.Error != nil {
		return nil, fmt.Errorf("erro ao listar os produtos por setor %s", result.Error)
	}

	return allProductsBySector, nil
}

func NewProductRepository(db *gorm.DB) IProductsRepostory {
	return &productsRepository{
		db: db,
	}
}
