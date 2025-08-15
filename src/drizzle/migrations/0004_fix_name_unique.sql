ALTER TABLE "products" DROP CONSTRAINT "products_name_unique";--> statement-breakpoint
CREATE UNIQUE INDEX "products_name_user_id_index" ON "products" USING btree ("name","user_id");