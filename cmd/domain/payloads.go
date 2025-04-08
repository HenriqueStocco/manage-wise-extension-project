package domain

type CategoryPayload struct {
	ID int
}

type UserPayload struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type EnterprisePayload struct {
	Name     string
	Document string
	Phone    string
}
