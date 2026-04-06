import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "featured_product_list_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer
  );
  
  CREATE TABLE "featured_product_list" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "featured_product_list_products" ADD CONSTRAINT "featured_product_list_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "featured_product_list_products" ADD CONSTRAINT "featured_product_list_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."featured_product_list"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "featured_product_list_products_order_idx" ON "featured_product_list_products" USING btree ("_order");
  CREATE INDEX "featured_product_list_products_parent_id_idx" ON "featured_product_list_products" USING btree ("_parent_id");
  CREATE INDEX "featured_product_list_products_product_idx" ON "featured_product_list_products" USING btree ("product_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "featured_product_list_products" CASCADE;
  DROP TABLE "featured_product_list" CASCADE;`)
}
