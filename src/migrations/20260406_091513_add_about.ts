import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_about_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_store_fk";
  
  DROP INDEX "about_updated_at_idx";
  DROP INDEX "about_created_at_idx";
  DROP INDEX "store_updated_at_idx";
  DROP INDEX "store_created_at_idx";
  DROP INDEX "payload_locked_documents_rels_about_id_idx";
  DROP INDEX "payload_locked_documents_rels_store_id_idx";
  ALTER TABLE "about" ALTER COLUMN "updated_at" DROP DEFAULT;
  ALTER TABLE "about" ALTER COLUMN "updated_at" DROP NOT NULL;
  ALTER TABLE "about" ALTER COLUMN "created_at" DROP DEFAULT;
  ALTER TABLE "about" ALTER COLUMN "created_at" DROP NOT NULL;
  ALTER TABLE "store" ALTER COLUMN "updated_at" DROP DEFAULT;
  ALTER TABLE "store" ALTER COLUMN "updated_at" DROP NOT NULL;
  ALTER TABLE "store" ALTER COLUMN "created_at" DROP DEFAULT;
  ALTER TABLE "store" ALTER COLUMN "created_at" DROP NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "about_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "store_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "store" ALTER COLUMN "updated_at" SET DEFAULT now();
  ALTER TABLE "store" ALTER COLUMN "updated_at" SET NOT NULL;
  ALTER TABLE "store" ALTER COLUMN "created_at" SET DEFAULT now();
  ALTER TABLE "store" ALTER COLUMN "created_at" SET NOT NULL;
  ALTER TABLE "about" ALTER COLUMN "updated_at" SET DEFAULT now();
  ALTER TABLE "about" ALTER COLUMN "updated_at" SET NOT NULL;
  ALTER TABLE "about" ALTER COLUMN "created_at" SET DEFAULT now();
  ALTER TABLE "about" ALTER COLUMN "created_at" SET NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "about_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "store_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_about_fk" FOREIGN KEY ("about_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_store_fk" FOREIGN KEY ("store_id") REFERENCES "public"."store"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_about_id_idx" ON "payload_locked_documents_rels" USING btree ("about_id");
  CREATE INDEX "payload_locked_documents_rels_store_id_idx" ON "payload_locked_documents_rels" USING btree ("store_id");
  CREATE INDEX "store_updated_at_idx" ON "store" USING btree ("updated_at");
  CREATE INDEX "store_created_at_idx" ON "store" USING btree ("created_at");
  CREATE INDEX "about_updated_at_idx" ON "about" USING btree ("updated_at");
  CREATE INDEX "about_created_at_idx" ON "about" USING btree ("created_at");`)
}
