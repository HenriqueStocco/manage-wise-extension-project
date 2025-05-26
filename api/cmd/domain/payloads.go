package domain

type UserPayload struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UserLoginPayload struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type EnterprisePayload struct {
	Name     string `json:"name"`
	Document string `json:"document"`
	Phone    string `json:"phone"`
}

type UserToEnterprisePayload struct {
	UserId       string `json:"user_id"`
	EnterpriseId string `json:"enterprise_id"`
}

type ProductPayload struct {
	CategoryId  string `json:"category_id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Sector      string `json:"sector"`
	ImageName   string `json:"image_name"`
	ImageType   string `json:"image_type"`
}

type CategoryPayload struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}
