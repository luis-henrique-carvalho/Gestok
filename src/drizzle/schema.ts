import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  serial,
  integer,
  pgEnum,
  index,
  uniqueIndex,
  numeric,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const sessionTable = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
});

export const accountTable = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verificationTable = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const categoryTable = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const productTable = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
    description: text("description").notNull(),
    sku: text("sku").notNull().unique(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    categoryId: integer("category_id").references(() => categoryTable.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: timestamp("updated_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("products_sku_index").on(table.sku),
    index("products_user_id_index").on(table.userId),
    index("products_category_id_index").on(table.categoryId),
    index("products_name_index").on(table.name),
  ]
);

export const movementTypeEnum = pgEnum("movement_type", ["in", "out"]);

export const movementReasonEnum = pgEnum("movement_reason", [
  "supplier_purchase",
  "customer_sale",
  "stock_replenishment",
]);

export const stockMovementsTable = pgTable(
  "stock_movements",
  {
    id: serial("id").primaryKey(),
    quantity: integer("quantity").notNull(),
    movementType: movementTypeEnum("movement_type").notNull(),
    movementReason: movementReasonEnum("movement_reason").notNull(),
    // Foreign keys
    productId: integer("product_id")
      .notNull()
      .references(() => productTable.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    // Timestamps
    createdAt: timestamp("created_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: timestamp("updated_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("stock_movements_product_id_index").on(table.productId),
    index("stock_movements_user_id_index").on(table.userId),
  ]
);

export const usersRelations = relations(userTable, ({ many }) => ({
  products: many(productTable),
  stockMovements: many(stockMovementsTable),
}));

export const categoriesRelations = relations(categoryTable, ({ many }) => ({
  products: many(productTable),
}));

export const productsRelations = relations(productTable, ({ one }) => ({
  category: one(categoryTable, {
    fields: [productTable.categoryId],
    references: [categoryTable.id],
  }),
  user: one(userTable, {
    fields: [productTable.userId],
    references: [userTable.id],
  }),
}));

export const stockMovementsRelations = relations(
  stockMovementsTable,
  ({ one }) => ({
    product: one(productTable, {
      fields: [stockMovementsTable.productId],
      references: [productTable.id],
    }),
    user: one(userTable, {
      fields: [stockMovementsTable.userId],
      references: [userTable.id],
    }),
  })
);
