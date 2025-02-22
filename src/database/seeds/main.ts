import { faker } from '@faker-js/faker'

import type {
    ProductsInsertSchema,
    CategoriesInsertSchema,
    UsersInsertSchema,
    EnterprisesInsertSchema,
} from '../schemas/index.ts'

function createSeedData() {
    const usersData: UsersInsertSchema[] = []
    const enterprisesData: EnterprisesInsertSchema[] = []
    const categoriesData: CategoriesInsertSchema[] = []
    const productsData: ProductsInsertSchema[] = []

    for (let i = 0; i < 10; i++) {
        usersData.push({
            name: faker.person.fullName(),
            username: faker.person.firstName(),
            email: faker.internet.email(),
            document: '00000000000',
            password: faker.internet.password(),
            phone: '00000000000',
            enterpriseId: ''
        })
    }
}
