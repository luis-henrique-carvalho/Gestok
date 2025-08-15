ALTER TABLE "products"
ALTER COLUMN "price" TYPE numeric(10, 2)
USING price::numeric(10, 2);
--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "sku" text NOT NULL;
--> statement-breakpoint
CREATE UNIQUE INDEX "products_sku_index" ON "products" USING btree ("sku");
--> statement-breakpoint
CREATE INDEX "products_user_id_index" ON "products" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX "products_category_id_index" ON "products" USING btree ("category_id");
--> statement-breakpoint
CREATE INDEX "products_name_index" ON "products" USING btree ("name");
--> statement-breakpoint
CREATE INDEX "stock_movements_product_id_index" ON "stock_movements" USING btree ("product_id");
--> statement-breakpoint
CREATE INDEX "stock_movements_user_id_index" ON "stock_movements" USING btree ("user_id");
--> statement-breakpoint
ALTER TABLE "stock_movements" DROP COLUMN "sku";
--> statement-breakpoint
ALTER TABLE "categories"
ADD CONSTRAINT "categories_name_unique" UNIQUE ("name");
--> statement-breakpoint
ALTER TABLE "products"
ADD CONSTRAINT "products_name_unique" UNIQUE ("name");
--> statement-breakpoint
ALTER TABLE "products"
ADD CONSTRAINT "products_sku_unique" UNIQUE ("sku");
