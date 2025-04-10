package domain

type CategoryPayload struct {
	ID int
}

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
