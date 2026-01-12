import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_users_roles" ADD VALUE 'editor' BEFORE 'customer';
  ALTER TYPE "public"."enum_users_roles" ADD VALUE 'reviewer' BEFORE 'customer';
  CREATE TABLE "authors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"bio" varchar,
  	"profile_picture_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"author_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"published_date" timestamp(3) with time zone NOT NULL,
  	"featured_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "authors_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "authors" ADD CONSTRAINT "authors_profile_picture_id_media_id_fk" FOREIGN KEY ("profile_picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "authors_profile_picture_idx" ON "authors" USING btree ("profile_picture_id");
  CREATE INDEX "authors_updated_at_idx" ON "authors" USING btree ("updated_at");
  CREATE INDEX "authors_created_at_idx" ON "authors" USING btree ("created_at");
  CREATE INDEX "posts_author_idx" ON "posts" USING btree ("author_id");
  CREATE INDEX "posts_featured_image_idx" ON "posts" USING btree ("featured_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_authors_id_idx" ON "payload_locked_documents_rels" USING btree ("authors_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "authors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "authors" CASCADE;
  DROP TABLE "posts" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_authors_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_posts_fk";
  
  ALTER TABLE "users_roles" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_users_roles";
  CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'customer');
  ALTER TABLE "users_roles" ALTER COLUMN "value" SET DATA TYPE "public"."enum_users_roles" USING "value"::"public"."enum_users_roles";
  DROP INDEX "payload_locked_documents_rels_authors_id_idx";
  DROP INDEX "payload_locked_documents_rels_posts_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "authors_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "posts_id";`)
}
