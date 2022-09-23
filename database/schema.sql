set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."projects" (
  "projectId" serial NOT NULL,
  "html" TEXT NOT NULL,
  "css" TEXT NOT NULL,
  "javascript" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "uploadedAt" timestamptz(6) NOT NULL DEFAULT now(),
  CONSTRAINT "projects_pk" PRIMARY KEY ("projectId")
) WITH (
  OIDS=FALSE
);
