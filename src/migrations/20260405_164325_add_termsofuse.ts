import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "delivery" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"seo_description" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "terms_of_use" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"seo_description" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "delivery_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "terms_of_use_id" integer;
  CREATE INDEX "delivery_updated_at_idx" ON "delivery" USING btree ("updated_at");
  CREATE INDEX "delivery_created_at_idx" ON "delivery" USING btree ("created_at");
  CREATE INDEX "terms_of_use_updated_at_idx" ON "terms_of_use" USING btree ("updated_at");
  CREATE INDEX "terms_of_use_created_at_idx" ON "terms_of_use" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_delivery_fk" FOREIGN KEY ("delivery_id") REFERENCES "public"."delivery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_terms_of_use_fk" FOREIGN KEY ("terms_of_use_id") REFERENCES "public"."terms_of_use"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_delivery_id_idx" ON "payload_locked_documents_rels" USING btree ("delivery_id");
  CREATE INDEX "payload_locked_documents_rels_terms_of_use_id_idx" ON "payload_locked_documents_rels" USING btree ("terms_of_use_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "delivery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "terms_of_use" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "delivery" CASCADE;
  DROP TABLE "terms_of_use" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_delivery_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_terms_of_use_fk";
  
  DROP INDEX "payload_locked_documents_rels_delivery_id_idx";
  DROP INDEX "payload_locked_documents_rels_terms_of_use_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "delivery_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "terms_of_use_id";`)
}
