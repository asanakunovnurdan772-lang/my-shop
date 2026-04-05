import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "store" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"address" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"socials_facebook" varchar,
  	"socials_instagram" varchar,
  	"socials_telegram" varchar,
  	"socials_whatsapp" varchar,
  	"logo_id" integer NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "store_id" integer;
  ALTER TABLE "store" ADD CONSTRAINT "store_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "store" ADD CONSTRAINT "store_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "store_logo_idx" ON "store" USING btree ("logo_id");
  CREATE INDEX "store_hero_image_idx" ON "store" USING btree ("hero_image_id");
  CREATE INDEX "store_updated_at_idx" ON "store" USING btree ("updated_at");
  CREATE INDEX "store_created_at_idx" ON "store" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_store_fk" FOREIGN KEY ("store_id") REFERENCES "public"."store"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_store_id_idx" ON "payload_locked_documents_rels" USING btree ("store_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "store" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "store" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_store_fk";
  
  DROP INDEX "payload_locked_documents_rels_store_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "store_id";`)
}
