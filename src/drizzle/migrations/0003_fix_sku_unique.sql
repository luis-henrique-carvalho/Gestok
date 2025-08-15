ALTER TABLE "products" DROP CONSTRAINT "products_sku_unique";--> statement-breakpoint
DROP INDEX "products_sku_index";--> statement-breakpoint
CREATE UNIQUE INDEX "products_sku_user_id_index" ON "products" USING btree ("sku","user_id");