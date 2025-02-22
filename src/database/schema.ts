import { pgTable, foreignKey, text, bigint, timestamp, doublePrecision, integer } from "drizzle-orm/pg-core"

export const expenseByCategory = pgTable("ExpenseByCategory", {
  expenseByCategoryId: text().primaryKey().notNull(),
  expenseSummaryId: text().notNull(),
  category: text().notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  amount: bigint({ mode: "number" }).notNull(),
  date: timestamp({ precision: 3, mode: 'string' }).notNull(),
}, (table) => {
  return {
    expenseByCategoryExpenseSummaryIdFkey: foreignKey({
      columns: [table.expenseSummaryId],
      foreignColumns: [expenseSummary.expenseSummaryId],
      name: "ExpenseByCategory_expenseSummaryId_fkey"
    }).onUpdate("cascade").onDelete("restrict"),
  }
});

export const expenseSummary = pgTable("ExpenseSummary", {
  expenseSummaryId: text().primaryKey().notNull(),
  totalExpenses: doublePrecision().notNull(),
  date: timestamp({ precision: 3, mode: 'string' }).notNull(),
});

export const expenses = pgTable("Expenses", {
  expenseId: text().primaryKey().notNull(),
  category: text().notNull(),
  amount: doublePrecision().notNull(),
  timestamp: timestamp({ precision: 3, mode: 'string' }).notNull(),
});

export const products = pgTable("Products", {
  productId: text().primaryKey().notNull(),
  name: text().notNull(),
  price: doublePrecision().notNull(),
  rating: doublePrecision(),
  stockQuantity: integer().notNull(),
});

export const purchaseSummary = pgTable("PurchaseSummary", {
  purchaseSummaryId: text().primaryKey().notNull(),
  totalPurchased: doublePrecision().notNull(),
  changePercentage: doublePrecision(),
  date: timestamp({ precision: 3, mode: 'string' }).notNull(),
});

export const purchases = pgTable("Purchases", {
  purchaseId: text().primaryKey().notNull(),
  productId: text().notNull(),
  timestamp: timestamp({ precision: 3, mode: 'string' }).notNull(),
  quantity: integer().notNull(),
  unitCost: doublePrecision().notNull(),
  totalCost: doublePrecision().notNull(),
}, (table) => {
  return {
    purchasesProductIdFkey: foreignKey({
      columns: [table.productId],
      foreignColumns: [products.productId],
      name: "Purchases_productId_fkey"
    }).onUpdate("cascade").onDelete("restrict"),
  }
});

export const sales = pgTable("Sales", {
  saleId: text().primaryKey().notNull(),
  productId: text().notNull(),
  timestamp: timestamp({ precision: 3, mode: 'string' }).notNull(),
  quantity: integer().notNull(),
  unitPrice: doublePrecision().notNull(),
  totalAmount: doublePrecision().notNull(),
}, (table) => {
  return {
    salesProductIdFkey: foreignKey({
      columns: [table.productId],
      foreignColumns: [products.productId],
      name: "Sales_productId_fkey"
    }).onUpdate("cascade").onDelete("restrict"),
  }
});

export const salesSummary = pgTable("SalesSummary", {
  salesSummaryId: text().primaryKey().notNull(),
  totalValue: doublePrecision().notNull(),
  changePercentage: doublePrecision(),
  date: timestamp({ precision: 3, mode: 'string' }).notNull(),
});

export const users = pgTable("Users", {
  userId: text().primaryKey().notNull(),
  name: text().notNull(),
  email: text().notNull(),
});