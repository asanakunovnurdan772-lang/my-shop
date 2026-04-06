import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_privacy_policy_fk";
  
  DROP INDEX "privacy_policy_updated_at_idx";
  DROP INDEX "privacy_policy_created_at_idx";
  DROP INDEX "payload_locked_documents_rels_privacy_policy_id_idx";
  ALTER TABLE "privacy_policy" ALTER COLUMN "updated_at" DROP DEFAULT;
  ALTER TABLE "privacy_policy" ALTER COLUMN "updated_at" DROP NOT NULL;
  ALTER TABLE "privacy_policy" ALTER COLUMN "created_at" DROP DEFAULT;
  ALTER TABLE "privacy_policy" ALTER COLUMN "created_at" DROP NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "privacy_policy_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "privacy_policy" ALTER COLUMN "updated_at" SET DEFAULT now();
  ALTER TABLE "privacy_policy" ALTER COLUMN "updated_at" SET NOT NULL;
  ALTER TABLE "privacy_policy" ALTER COLUMN "created_at" SET DEFAULT now();
  ALTER TABLE "privacy_policy" ALTER COLUMN "created_at" SET NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "privacy_policy_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_privacy_policy_fk" FOREIGN KEY ("privacy_policy_id") REFERENCES "public"."privacy_policy"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_privacy_policy_id_idx" ON "payload_locked_documents_rels" USING btree ("privacy_policy_id");
  CREATE INDEX "privacy_policy_updated_at_idx" ON "privacy_policy" USING btree ("updated_at");
  CREATE INDEX "privacy_policy_created_at_idx" ON "privacy_policy" USING btree ("created_at");`)
}
