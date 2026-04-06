import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_terms_of_use_fk";
  
  DROP INDEX "terms_of_use_updated_at_idx";
  DROP INDEX "terms_of_use_created_at_idx";
  DROP INDEX "payload_locked_documents_rels_terms_of_use_id_idx";
  ALTER TABLE "terms_of_use" ALTER COLUMN "updated_at" DROP DEFAULT;
  ALTER TABLE "terms_of_use" ALTER COLUMN "updated_at" DROP NOT NULL;
  ALTER TABLE "terms_of_use" ALTER COLUMN "created_at" DROP DEFAULT;
  ALTER TABLE "terms_of_use" ALTER COLUMN "created_at" DROP NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "terms_of_use_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "terms_of_use" ALTER COLUMN "updated_at" SET DEFAULT now();
  ALTER TABLE "terms_of_use" ALTER COLUMN "updated_at" SET NOT NULL;
  ALTER TABLE "terms_of_use" ALTER COLUMN "created_at" SET DEFAULT now();
  ALTER TABLE "terms_of_use" ALTER COLUMN "created_at" SET NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "terms_of_use_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_terms_of_use_fk" FOREIGN KEY ("terms_of_use_id") REFERENCES "public"."terms_of_use"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_terms_of_use_id_idx" ON "payload_locked_documents_rels" USING btree ("terms_of_use_id");
  CREATE INDEX "terms_of_use_updated_at_idx" ON "terms_of_use" USING btree ("updated_at");
  CREATE INDEX "terms_of_use_created_at_idx" ON "terms_of_use" USING btree ("created_at");`)
}
