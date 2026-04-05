import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "privacy_policy" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"seo_description" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "privacy_policy_id" integer;
  CREATE INDEX "privacy_policy_updated_at_idx" ON "privacy_policy" USING btree ("updated_at");
  CREATE INDEX "privacy_policy_created_at_idx" ON "privacy_policy" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_privacy_policy_fk" FOREIGN KEY ("privacy_policy_id") REFERENCES "public"."privacy_policy"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_privacy_policy_id_idx" ON "payload_locked_documents_rels" USING btree ("privacy_policy_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "privacy_policy" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "privacy_policy" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_privacy_policy_fk";
  
  DROP INDEX "payload_locked_documents_rels_privacy_policy_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "privacy_policy_id";`)
}
