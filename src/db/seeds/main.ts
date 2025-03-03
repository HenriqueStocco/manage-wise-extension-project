import { v4 as uuidv4 } from 'uuid'
import { faker } from '@faker-js/faker'

import { env } from '@/config/env.ts'
import { postgresClient, pgClient, schema } from '@/db/index.ts'
import { generateRandomNumber } from '@/utils/numberGenerator.ts'

function createSeedData() {
  const usersData: schema.UsersInsertSchema[] = []
  const enterprisesData: schema.EnterprisesInsertSchema[] = []
  const categoriesData: schema.CategoriesInsertSchema[] = []
  const productsData: schema.ProductsInsertSchema[] = []

  for (let i = 0; i < 10; i++) {
    usersData.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      document: '00000000000',
      password: faker.internet.password(),
      enterpriseId: uuidv4(),
    })
    enterprisesData.push({
      name: faker.company.name(),
      cnpj: String(generateRandomNumber(11)),
    })
    categoriesData.push({
      name: faker.book.genre(),
    })
    productsData.push({
      name: faker.commerce.productName(),
      assetCode: generateRandomNumber(9),
      quantity: generateRandomNumber(2),
    })
  }

  return {
    usersData,
    enterprisesData,
    categoriesData,
    productsData,
  }
}

async function main() {
  try {
    const client = new pgClient({ connectionString: env.DATABASE_URL })

    await client.connect()

    const driver = postgresClient(client)
    const { categoriesData, enterprisesData, productsData, usersData } = createSeedData()

    await driver.transaction(async tx => {
      await tx.insert(schema.categoriesTable).values(categoriesData)
      await tx.insert(schema.enterprisesTable).values(enterprisesData)
      await tx.insert(schema.productsTable).values(productsData)
      await tx.insert(schema.usersTable).values(usersData)
    })

    await client.end()

    process.exit(0)
  } catch (error) {
    console.error(error)

    process.exit(0)
  }
}

main()
