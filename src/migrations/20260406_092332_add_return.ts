import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_delivery_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_return_fk";
  
  DROP INDEX "delivery_updated_at_idx";
  DROP INDEX "delivery_created_at_idx";
  DROP INDEX "return_updated_at_idx";
  DROP INDEX "return_created_at_idx";
  DROP INDEX "payload_locked_documents_rels_delivery_id_idx";
  DROP INDEX "payload_locked_documents_rels_return_id_idx";
  ALTER TABLE "delivery" ALTER COLUMN "updated_at" DROP DEFAULT;
  ALTER TABLE "delivery" ALTER COLUMN "updated_at" DROP NOT NULL;
  ALTER TABLE "delivery" ALTER COLUMN "created_at" DROP DEFAULT;
  ALTER TABLE "delivery" ALTER COLUMN "created_at" DROP NOT NULL;
  ALTER TABLE "return" ALTER COLUMN "updated_at" DROP DEFAULT;
  ALTER TABLE "return" ALTER COLUMN "updated_at" DROP NOT NULL;
  ALTER TABLE "return" ALTER COLUMN "created_at" DROP DEFAULT;
  ALTER TABLE "return" ALTER COLUMN "created_at" DROP NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "delivery_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "return_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "delivery" ALTER COLUMN "updated_at" SET DEFAULT now();
  ALTER TABLE "delivery" ALTER COLUMN "updated_at" SET NOT NULL;
  ALTER TABLE "delivery" ALTER COLUMN "created_at" SET DEFAULT now();
  ALTER TABLE "delivery" ALTER COLUMN "created_at" SET NOT NULL;
  ALTER TABLE "return" ALTER COLUMN "updated_at" SET DEFAULT now();
  ALTER TABLE "return" ALTER COLUMN "updated_at" SET NOT NULL;
  ALTER TABLE "return" ALTER COLUMN "created_at" SET DEFAULT now();
  ALTER TABLE "return" ALTER COLUMN "created_at" SET NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "delivery_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "return_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_delivery_fk" FOREIGN KEY ("delivery_id") REFERENCES "public"."delivery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_return_fk" FOREIGN KEY ("return_id") REFERENCES "public"."return"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_delivery_id_idx" ON "payload_locked_documents_rels" USING btree ("delivery_id");
  CREATE INDEX "payload_locked_documents_rels_return_id_idx" ON "payload_locked_documents_rels" USING btree ("return_id");
  CREATE INDEX "delivery_updated_at_idx" ON "delivery" USING btree ("updated_at");
  CREATE INDEX "delivery_created_at_idx" ON "delivery" USING btree ("created_at");
  CREATE INDEX "return_updated_at_idx" ON "return" USING btree ("updated_at");
  CREATE INDEX "return_created_at_idx" ON "return" USING btree ("created_at");`)
}
