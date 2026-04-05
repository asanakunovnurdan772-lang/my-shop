import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "return" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"seo_description" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "return_id" integer;
  CREATE INDEX "return_updated_at_idx" ON "return" USING btree ("updated_at");
  CREATE INDEX "return_created_at_idx" ON "return" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_return_fk" FOREIGN KEY ("return_id") REFERENCES "public"."return"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_return_id_idx" ON "payload_locked_documents_rels" USING btree ("return_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "return" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "return" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_return_fk";
  
  DROP INDEX "payload_locked_documents_rels_return_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "return_id";`)
}
