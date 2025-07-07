/*
  Warnings:

  - The primary key for the `Application` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `applicationUrl` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `deadline` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `institutionName` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `programPosition` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Application` table. All the data in the column will be lost.
  - The `id` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ChecklistItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `applicationId` on the `ChecklistItem` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `ChecklistItem` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `ChecklistItem` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `ChecklistItem` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `ChecklistItem` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `ChecklistItem` table. All the data in the column will be lost.
  - The `id` column on the `ChecklistItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `education` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `references` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `Profile` table. All the data in the column will be lost.
  - The `id` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `University` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `applicationUrl` on the `University` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `University` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `University` table. All the data in the column will be lost.
  - The `id` column on the `University` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[name]` on the table `University` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `applicationDate` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `universityId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checklistTemplateId` to the `ChecklistItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ChecklistItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `University` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChecklistItem" DROP CONSTRAINT "ChecklistItem_applicationId_fkey";

-- AlterTable
ALTER TABLE "Application" DROP CONSTRAINT "Application_pkey",
DROP COLUMN "applicationUrl",
DROP COLUMN "deadline",
DROP COLUMN "institutionName",
DROP COLUMN "priority",
DROP COLUMN "programPosition",
DROP COLUMN "type",
ADD COLUMN     "applicationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "profileId" INTEGER NOT NULL,
ADD COLUMN     "universityId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "notes" DROP NOT NULL,
ALTER COLUMN "notes" DROP DEFAULT,
ADD CONSTRAINT "Application_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ChecklistItem" DROP CONSTRAINT "ChecklistItem_pkey",
DROP COLUMN "applicationId",
DROP COLUMN "category",
DROP COLUMN "description",
DROP COLUMN "dueDate",
DROP COLUMN "priority",
DROP COLUMN "title",
ADD COLUMN     "checklistTemplateId" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ChecklistItem_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pkey",
DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "education",
DROP COLUMN "experience",
DROP COLUMN "fullName",
DROP COLUMN "phone",
DROP COLUMN "references",
DROP COLUMN "skills",
ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "University" DROP CONSTRAINT "University_pkey",
DROP COLUMN "applicationUrl",
DROP COLUMN "city",
DROP COLUMN "country",
ADD COLUMN     "acceptanceRate" DOUBLE PRECISION,
ADD COLUMN     "applicationLink" TEXT,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "priority" INTEGER,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "University_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "ProgramFocus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "universityId" INTEGER NOT NULL,

    CONSTRAINT "ProgramFocus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scholarship" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "acceptanceRate" DOUBLE PRECISION,
    "universityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scholarship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChecklistTemplate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "applicationId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChecklistTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "University_name_key" ON "University"("name");

-- AddForeignKey
ALTER TABLE "ProgramFocus" ADD CONSTRAINT "ProgramFocus_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scholarship" ADD CONSTRAINT "Scholarship_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistTemplate" ADD CONSTRAINT "ChecklistTemplate_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistItem" ADD CONSTRAINT "ChecklistItem_checklistTemplateId_fkey" FOREIGN KEY ("checklistTemplateId") REFERENCES "ChecklistTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
